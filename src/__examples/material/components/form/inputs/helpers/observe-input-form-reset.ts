import { createObjectPropertyObservable, empty, fromSelfEventTarget, IObservable, switchMap$$ } from '@lirx/core';
import { IHavingFormProperty } from './has-form-property';

export function observeInputFormReset(
  element: IHavingFormProperty,
): IObservable<Event> {
  const form$ = createObjectPropertyObservable(element, 'form', { allowGetters: 'allow' });

  return switchMap$$(form$, (form: HTMLFormElement | null): IObservable<any> => {
    return (form === null)
      ? empty()
      : fromSelfEventTarget(form, 'reset');
  });
}
