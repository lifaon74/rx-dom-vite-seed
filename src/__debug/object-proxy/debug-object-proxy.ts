export interface IOnChangeFunction {
  (): void;
}



/*----*/

export class SetChangeProxy<GValue> extends Set<GValue> {

  protected _onChange: IOnChangeFunction;

  constructor(
    onChange: IOnChangeFunction,
    values?: Iterable<GValue> | null,
  ) {
    super(values);
    this._onChange = onChange;
  }

  override add(
    value: GValue,
  ): this {
    const result: this = super.add(value);
    this._onChange?.();
    return result;
  }

  override clear(): void {
    super.clear();
    this._onChange();
  }

  override delete(
    value: GValue,
  ): boolean {
    const result: boolean = super.delete(value);
    this._onChange();
    return result;
  }
}

/*----*/

export function createObjectChangeProxy<GObject extends object>(
  array: GObject,
  onChange: () => void,
): GObject {
  return new Proxy<GObject>(array, {
    get(target: GObject, p: string | symbol, receiver: any): any {
      let ret = Reflect.get(target, p, receiver);
      console.log(`get(${String(p)}=${ret})`);
      if (typeof ret === 'function') {
        ret = ret.bind(target);
      }
      return ret;
    },
    set(target: GObject, p: string | symbol, value: any, receiver: any): boolean {
      queueMicrotask(onChange);
      console.log('set', ...arguments);
      return true;
      // return Reflect.set(target, p, value, receiver);
    },
  });
}

/*------------------------*/

function debugArrayProxy(): void {
  const array = [0, 1, 2];

  const proxy = createObjectChangeProxy(array, () => {
    console.log('changed');
  });
  // proxy[0] = 1;
  // proxy.push(3);
  proxy.pop();
  console.log(proxy);
}

function debugSetProxy(): void {
  const set = new Set([0, 1, 2]);

  const proxy = new SetChangeProxy(() => {
    console.log('changed');
  }, set);

  proxy.add(4);
  console.log(proxy);
}

/*------------------------*/

export function debugObjectProxy(): void {
  // debugArrayProxy();
  debugSetProxy();
}
