import { fromAnimationFrame, scan$$ } from '@lirx/core';
import { IGenericVirtualCustomElementNode } from '@lirx/dom';

export function createProgressAnimation(
  element: IGenericVirtualCustomElementNode,
) {
  const progress$ = scan$$(fromAnimationFrame(), _ => (_ + 0.01) % 1, 0);
  element.setReactiveInput('progress', progress$);

}
