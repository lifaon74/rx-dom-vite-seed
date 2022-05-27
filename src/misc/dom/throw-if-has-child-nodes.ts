import { hasChildNodes } from './has-child-nodes';

export function throwIfHasChildNodes(
  node: Element,
): void {
  if (hasChildNodes(node)) {
    throw new Error(`Should not have any children`);
  }
}

