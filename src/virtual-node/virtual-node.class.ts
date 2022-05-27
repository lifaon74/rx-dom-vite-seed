import {
  distinctObservable,
  empty,
  IMulticastReplayLastSource,
  IObservable,
  let$$,
  mergeMapSingleObservable,
  shareObservable,
} from '@lirx/core';
import { nodeHasRootParentObservable } from './functions/node-has-root-parent-observable';

export type IVirtualNodeOrNull = VirtualNode | null;

export interface IVirtualNodeOptions {
  isRoot: boolean;
  isLeaf: boolean,
}

export abstract class VirtualNode {

  protected readonly _isRoot: boolean;
  protected readonly _isLeaf: boolean;

  protected _$parentNode$: IMulticastReplayLastSource<IVirtualNodeOrNull>;
  protected _previousNode: IVirtualNodeOrNull;
  protected _nextNode: IVirtualNodeOrNull;
  protected _firstChild: IVirtualNodeOrNull;
  protected _lastChild: IVirtualNodeOrNull;

  protected readonly _isConnected$: IObservable<boolean>;

  protected constructor(
    {
      isRoot,
      isLeaf,
    }: IVirtualNodeOptions,
  ) {
    this._isRoot = isRoot;
    this._isLeaf = isLeaf;

    this._$parentNode$ = let$$<IVirtualNodeOrNull>(null);
    this._previousNode = null;
    this._nextNode = null;
    this._firstChild = null;
    this._lastChild = null;

    this._isConnected$ = shareObservable(distinctObservable(nodeHasRootParentObservable(this)));
  }

  get isRoot(): boolean {
    return this._isRoot;
  }

  get isLeaf(): boolean {
    return this._isLeaf;
  }

  get parentNode$(): IObservable<IVirtualNodeOrNull> {
    return this._$parentNode$.subscribe;
  }

  get parentNode(): IVirtualNodeOrNull {
    return this._$parentNode$.getValue();
  }

  get previousNode(): IVirtualNodeOrNull {
    return this._previousNode;
  }

  get nextNode(): IVirtualNodeOrNull {
    return this._nextNode;
  }

  get firstChild(): IVirtualNodeOrNull {
    return this._firstChild;
  }

  get lastChild(): IVirtualNodeOrNull {
    return this._lastChild;
  }

  get isConnected(): boolean {
    let node: IVirtualNodeOrNull = this;
    while (node !== null) {
      if (node.isRoot) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

  get isConnected$(): IObservable<boolean> {
    return this._isConnected$;
  }

  onConnected$<GValue>(
    observable: IObservable<GValue>,
  ): IObservable<GValue> {
    // or conditionalObservable
    return mergeMapSingleObservable(this._isConnected$, (connected: boolean): IObservable<GValue> => {
      return connected
        ? observable
        : empty<GValue>();
    });
  }

  contains(
    childNode: VirtualNode,
  ): boolean {
    let node: IVirtualNodeOrNull = childNode;

    do {
      if (node === this) {
        return true;
      } else {
        node = node.parentNode;
      }
    } while (node !== null);

    return false;
  }

  attach(
    parentNode: VirtualNode,
    referenceNode: IVirtualNodeOrNull = null,
  ): boolean {
    if (referenceNode === null) {
      if (
        (this.parentNode === parentNode)
        && (this.parentNode._lastChild === this) // current node is already the last child of parentNode, so we have nothing to do
      ) {
        return false;
      }
    } else {
      if (
        (referenceNode === this)
        || (this._nextNode === referenceNode)
      ) { // current node is already before referenceNode, so we have nothing to do
        return false;
      }

      if (referenceNode.parentNode !== parentNode) {
        throw new Error(`referenceNode must have parentNode as parent`);
      }
    }

    if (this._isRoot) {
      throw new Error(`Cannot attach a root node`);
    }

    if (parentNode._isLeaf) {
      throw new Error(`Cannot attach to a leaf node`);
    }

    if (this.contains(parentNode)) {
      throw new Error(`current node already contains parentNode`);
    }

    // detach current node
    if (this.parentNode !== null) {
      if (this._previousNode === null) { // current node is first child
        this.parentNode._firstChild = this._nextNode;
      } else {
        this._previousNode._nextNode = this._nextNode;
      }

      if (this._nextNode === null) { // current node is last child
        this.parentNode._lastChild = this._previousNode;
      } else {
        this._nextNode._previousNode = this._previousNode;
      }
    }

    this._nextNode = referenceNode;

    if (referenceNode === null) {
      this._previousNode = parentNode._lastChild;

      if (parentNode._lastChild === null) { // empty list
        parentNode._firstChild = this;
        parentNode._lastChild = this;
      } else {
        parentNode._lastChild._nextNode = this;
        parentNode._lastChild = this;
      }
    } else {
      this._previousNode = referenceNode._previousNode;

      if (referenceNode._previousNode === null) { // referenceNode is first child
        parentNode._firstChild = this;
      } else {
        referenceNode._previousNode._nextNode = this;
      }

      referenceNode._previousNode = this;
    }

    this._$parentNode$.emit(parentNode);

    return true;
  }

  detach(): boolean {
    if (this.isRoot) {
      throw new Error(`Cannot detach a root node`);
    }

    if (this.parentNode === null) {
      return false;
    } else {
      if (this._previousNode === null) { // current node is first child
        this.parentNode._firstChild = this._nextNode;
      } else {
        this._previousNode._nextNode = this._nextNode;
      }

      if (this._nextNode === null) { // current node is last child
        this.parentNode._lastChild = this._previousNode;
      } else {
        this._nextNode._previousNode = this._previousNode;
      }

      this._previousNode = null;
      this._nextNode = null;
      this._$parentNode$.emit(null);
      return true;
    }
  }

  * getChildren(): Generator<VirtualNode> {
    let node: IVirtualNodeOrNull = this._firstChild;
    while (node !== null) {
      yield node;
      node = node._nextNode;
    }
  }

  * getChildrenReversed(): Generator<VirtualNode> {
    let node: IVirtualNodeOrNull = this._lastChild;
    while (node !== null) {
      yield node;
      node = node._previousNode;
    }
  }

  * getChildrenRecursive(): Generator<VirtualNode> {
    const iterator: Iterator<VirtualNode> = this.getChildren();
    let result: IteratorResult<VirtualNode>;
    while (!(result = iterator.next()).done) {
      const childNode: VirtualNode = result.value;
      yield childNode;
      yield * childNode.getChildrenRecursive();
    }
  }

  detachChildren(): void {
    let node: IVirtualNodeOrNull = this._firstChild;
    while (node !== null) {
      node.detach();
      node = node._nextNode;
    }
  }
}
