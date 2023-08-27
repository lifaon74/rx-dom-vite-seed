type ExploreId = number;

let exploreId: ExploreId = 0;

function getExploreId(): ExploreId {
  return ++exploreId;
}

type OnDestroyCallback = (value: any) => void;

class GraphNode {
  static ROOT: GraphNode = new GraphNode(void 0, () => {
  });

  readonly value: any;
  readonly onDestroy: OnDestroyCallback;
  readonly parents: Set<GraphNode>;
  readonly children: Set<GraphNode>;
  exploreId: ExploreId;
  isRootReachableExplore: boolean;

  constructor(
    value: any,
    onDestroy: OnDestroyCallback,
  ) {
    this.value = value;
    this.onDestroy = onDestroy;
    this.parents = new Set<GraphNode>();
    this.children = new Set<GraphNode>();
    this.exploreId = 0;
    this.isRootReachableExplore = false;
  }

  hasChild(
    child: GraphNode,
  ): boolean {
    return this.children.has(child);
  }

  addChild(
    child: GraphNode,
  ): void {
    this.children.add(child);
    child.parents.add(this);
  }

  removeChild(
    child: GraphNode,
    exploreId: ExploreId = getExploreId(),
  ): void {
    if (this.children.delete(child)) {
      child.parents.delete(this);
      child.garbageCollect(exploreId);
    }
  }

  isRootReachable(
    exploreId: ExploreId,
  ): boolean {
    if (this === GraphNode.ROOT) {
      return true;
    } else {
      if (this.exploreId !== exploreId) {
        this.exploreId = exploreId;
        this.isRootReachableExplore = false;

        const iterator: Iterator<GraphNode> = this.parents[Symbol.iterator]();
        let result: IteratorResult<GraphNode>;
        while (!(result = iterator.next()).done) {
          if (result.value.isRootReachable(exploreId)) {
            this.isRootReachableExplore = true;
            break;
          }
        }
      }
      return this.isRootReachableExplore;
    }
  }

  garbageCollect(
    exploreId: ExploreId,
  ): void {
    if (!this.isRootReachable(exploreId)) {
      this.onDestroy(this.value);
      let result: IteratorResult<GraphNode>;
      while (!(result = this.children[Symbol.iterator]().next()).done) {
        this.removeChild(result.value, exploreId);
      }
    }
  }
}

export interface IHavingGraphNode {
  readonly graphNode: GraphNode;
}

class Value<GValue> implements IHavingGraphNode {
  readonly graphNode: GraphNode;
  readonly value: GValue;

  // protected readonly destroy: (value: GValue) => void;

  constructor(
    value: GValue,
    owner: IHavingGraphNode,
  ) {
    this.graphNode = new GraphNode(this, (self: this): void => {
      console.log('destroy value', self.value);
      // delete self.value;
    });
    this.value = value;
    owner.graphNode.addChild(this.graphNode);
  }
}

/**
 * @deprecated
 */
class Scope {
  protected readonly values: IHavingGraphNode[];

  constructor() {
    this.values = [];
  }

  register<GValue extends IHavingGraphNode>(
    value: GValue,
  ): GValue {
    GraphNode.ROOT.addChild(value.graphNode);
    this.values.push(value);
    return value;
  }

  destroy(): void {
    this.values.forEach((value: IHavingGraphNode) => {
      GraphNode.ROOT.removeChild(value.graphNode);
    });
  }
}

class Object implements IHavingGraphNode {
  readonly graphNode: GraphNode;
  readonly properties: Map<string, Value<any>>;

  constructor() {
    this.graphNode = new GraphNode(this, (self: this): void => {
      console.log('destroy object');
    });
    this.properties = new Map<string, Value<any>>();
  }

  setProperty(
    key: string,
    value: Value<any>,
  ): void {
    this.properties.set(key, value);
    this.graphNode.addChild(value.graphNode);
  }

  getProperty(
    key: string,
  ): Value<any> {
    return this.properties.get(key)!;
  }

  removeProperty(
    key: string,
  ): void {
    this.graphNode.removeChild(this.properties.get(key)!.graphNode);
    this.properties.delete(key);
  }
}

export type ClosureCallback<GContext extends IHavingGraphNode, GArgument, GReturn> = (
  context: GContext,
  arg: GArgument,
) => GReturn;

class Closure<GContext extends IHavingGraphNode, GArgument, GReturn> implements IHavingGraphNode {
  readonly graphNode: GraphNode;
  readonly fnc: ClosureCallback<GContext, GArgument, GReturn>;
  readonly context: GContext;

  constructor(
    fnc: ClosureCallback<GContext, GArgument, GReturn>,
    context: GContext,
  ) {
    this.graphNode = new GraphNode(this, (self: this): void => {
      console.log('destroy closure');
    });
    this.graphNode.addChild(context.graphNode);
    this.fnc = fnc;
    this.context = context;
  }

  call(
    arg: GArgument,
  ): GReturn {
    return this.fnc(this.context, arg);
  }
}

/*-------------*/

async function debugScope1() {
  const scope = new Scope();

  const a = scope.register(new Value(new String('a')));
  const b = scope.register(new Value(new Number(1)));
  const obj = scope.register(new Object());
  obj.setProperty('a', a);

  const c = scope.register(
    new Closure((context: Object, arg: Value<Number>): Value<string> => {
      return new Value(context.getProperty('a').value.valueOf() + arg.value.valueOf());
    }, obj),
  );

  const d = scope.register(c.call(b));
  console.log(d);

  scope.destroy();
}

/*-------------*/

export function debugScope(): void {
  debugScope1();
}