import { IObservable, mergeMapSingleObservable, single } from '@lirx/core';
import { IVirtualNodeOrNull, VirtualNode } from '../virtual-node.class';

export function nodeHasRootParentObservable(
  node: VirtualNode,
): IObservable<boolean> {
  if (node.isRoot) {
    return single(true);
  } else {
    return mergeMapSingleObservable(node.parentNode$, (parentNode: IVirtualNodeOrNull): IObservable<boolean> => {
      if (parentNode === null) {
        return single(false);
      } else if (parentNode.isRoot) {
        return single(true);
      } else {
        return nodeHasRootParentObservable(parentNode);
      }
    });
  }
}
