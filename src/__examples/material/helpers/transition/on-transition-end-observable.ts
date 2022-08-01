import { first$$, fromEventTarget, IObservable, merge, switchMap$$, timeout } from '@lirx/core';
import { getLongestTransitionDurationOfElement } from './get-transition-duration-of-element';

export function onTransitionEndObservable(
  element: Element,
): IObservable<any> {
  // console.log('sub');
  // element.addEventListener('transitioncancel', () => console.log('transitioncancel'))
  // element.addEventListener('transitionend', () => console.log('transitionend'))

  const transitionEnd$ = fromEventTarget(element, 'transitionend');
  const transitionRun$ = fromEventTarget(element, 'transitionrun');
  const transitionCancel$ = fromEventTarget(element, 'transitioncancel');

  const transitionCanceled$ = switchMap$$(transitionRun$, () => transitionCancel$);
  const transitionDurationTimeout$ = timeout(getLongestTransitionDurationOfElement(element));

  transitionCanceled$(() => console.log('cancelled'));

  return first$$<any>(
    merge([
      transitionEnd$,
      transitionCanceled$,
      transitionDurationTimeout$,
    ]),
  );
}
