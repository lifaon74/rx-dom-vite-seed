import { distinct$$, fromSelfEventTarget, IObservable, map$$, merge, single } from '@lirx/core';
import { observeInputFormReset } from '../../../helpers/observe-input-form-reset';

export type IInputDirtyElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  ;

export function observeInputDirty(
  element: IInputDirtyElement,
): IObservable<boolean> {
  return distinct$$(
    merge([
      single(false),
      map$$(fromSelfEventTarget(element, 'input'), () => true),
      map$$(fromSelfEventTarget(element, 'reset'), () => false),
      map$$(observeInputFormReset(element), () => false),
    ]),
  );
}
