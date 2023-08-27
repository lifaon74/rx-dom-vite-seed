import { fromAnimationFrame, scan$$ } from '@lirx/core';
import { IGenericVirtualComponentNode } from '@lirx/dom';

export function createProgressAnimation(
  element: IGenericVirtualComponentNode,
) {
  const progress$ = scan$$(fromAnimationFrame(), _ => (_ + 0.01) % 1, 0);
  element.bindInputWithObservable('progress', progress$);

}
