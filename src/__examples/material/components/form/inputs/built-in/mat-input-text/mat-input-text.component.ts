import { $$map, IObservable, IObserver, map$$, single, switchMap$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualComponentNode } from '@lirx/dom';
import { IGenericFormInputText } from '../../../form-control/form-input/built-in/form-input-text/form-input-text.class';
import { IFormInputValue } from '../../../form-control/form-input/types/form-input-value.type';
import { INVALID_TYPE_TOKEN } from '../../../form-control/tokens/invalid-type.token';
import { INoValueToken, NO_VALUE_TOKEN } from '../../../form-control/tokens/no-value.token';
import { MatInputFieldModifier } from '../../fragments/mat-input-field/mat-input-field.modifier';

// @ts-ignore
import html from './mat-input-text.component.html?raw';
// @ts-ignore
import style from './mat-input-text.component.scss?inline';

/**
 * COMPONENT: 'mat-input-text'
 */

export type IMatInputTextComponentType =
  | 'text'
  | 'password'
  // | 'email'
  // | 'url'
  // | 'tel'
;

interface ITemplateData {
  readonly controller$: IObservable<IGenericFormInputText>;
  readonly type$: IObservable<IMatInputTextComponentType>;
  readonly value$: IObservable<string>;
  readonly $input: IObservable<IObserver<Event>>;
  readonly required$: IObservable<boolean>;
  readonly minLength$: IObservable<number | undefined>;
  readonly maxLength$: IObservable<number | undefined>;
  readonly pattern$: IObservable<string | undefined>;
}

interface IMatInputTextComponentConfig {
  element: HTMLElement;
  inputs: [
    ['controller', IGenericFormInputText],
    ['type', IMatInputTextComponentType],
  ];
  data: ITemplateData;
}

export const MatInputTextComponent = createComponent<IMatInputTextComponentConfig>({
  name: 'mat-input-text',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    modifiers: [
      MatInputFieldModifier,
    ],
  }),
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  inputs: [
    ['controller'],
    ['type', 'text'],
  ],
  init: (node: VirtualComponentNode<IMatInputTextComponentConfig>): ITemplateData => {
    const controller$ = node.inputs.get$('controller');
    const type$ = node.inputs.get$('type');


    const value$ = switchMap$$(controller$, (controller: IGenericFormInputText): IObservable<string> => {
      return map$$<IFormInputValue<string>, string>(controller.value$, (value: IFormInputValue<string>): string => {
        return (
          (value === NO_VALUE_TOKEN)
          || (value === INVALID_TYPE_TOKEN)
        )
          ? ''
          : value;
      });
    });


    const $value = map$$(controller$, (controller: IGenericFormInputText): IObserver<string> => {
      return $$map<string, IFormInputValue<string>>(controller.$value, (value: string): IFormInputValue<string> => {
        return (value === '')
          ? NO_VALUE_TOKEN
          : value;
      });
    });

    const $input = map$$($value, (value$: IObserver<string>): IObserver<Event> => {
      return $$map<Event, string>(value$, (event: Event): string => {
        return (event.target as HTMLInputElement).value;
      });
    });

    const required$ = switchMap$$(controller$, controller => controller.required$);

    const minLength$ = switchMap$$(controller$, controller => controller.minLength$);
    const maxLength$ = switchMap$$(controller$, controller => controller.maxLength$);
    const pattern$ = switchMap$$(controller$, controller => {
      return map$$(controller.pattern$, _ => _?.source);
    });
    const reset$ = switchMap$$(controller$, controller => controller.reset$);


    node.onConnected$(reset$)(() => {
      node.elementNode.dispatchEvent(new CustomEvent('reset'));
    });

    return {
      controller$,
      type$,
      value$,
      $input,
      required$,
      minLength$,
      maxLength$,
      pattern$,
    };
  },
});



