import { distinct$$, fromSelfEventTarget, IObservable, map$$, merge, single } from '@lirx/core';
import { observeInputFormReset } from '../../../helpers/observe-input-form-reset';

export type IInputTouchedElement =
  | HTMLInputElement
  | HTMLTextAreaElement
;

export function observeInputTouched(
  element: IInputTouchedElement,
): IObservable<boolean> {
  return distinct$$(
    merge([
      single(false),
      map$$(fromSelfEventTarget(element, 'blur'), () => true),
      map$$(fromSelfEventTarget(element, 'reset'), () => false),
      map$$(observeInputFormReset(element), () => false),
    ]),
  );
}

