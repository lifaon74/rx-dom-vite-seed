import {
  createMulticastReplayLastSource,
  distinct$$$,
  distinctObservable,
  idle,
  IObservable,
  MAP_FILTER_DISCARD,
  mapFilter$$$,
  mapObservable,
  merge,
  pipe$$,
  createObjectPropertyObservable,
  switchMap$$,
} from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';

// @ts-ignore
import html from './mat-input-field.component.html?raw';
// @ts-ignore
import style from './mat-input-field.component.scss?inline';

/**
 * COMPONENT: 'mat-input-field'
 */

interface IData {
  // readonly disabled$: IObservable<boolean>;
}

interface IMatInputFieldComponentConfig {
  element: HTMLElement;
  inputs: [
    ['disabled', boolean],
  ];
  data: IData;
}

export const MatInputFieldComponent = createComponent<IMatInputFieldComponentConfig>({
  name: 'mat-input-field',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [],
  }),
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  inputs: [
    ['disabled', false],
  ],
  init: (node: VirtualCustomElementNode<IMatInputFieldComponentConfig>): IData => {
    const input$ = pipe$$(idle(), [
      mapFilter$$$<any, HTMLInputElement>(() => {
        const input: HTMLInputElement | null = node.elementNode.querySelector('input');
        return (input === null)
          ? MAP_FILTER_DISCARD
          : input;
      }),
      distinct$$$<HTMLInputElement>(),
    ]);

    const inputDisabled$ = switchMap$$(input$, (input: HTMLInputElement): IObservable<boolean> => {
      return createObjectPropertyObservable(input, 'disabled');
    });

    const disabled$ = merge([
      node.inputs.get$('disabled'),
      inputDisabled$,
    ]);

    node.setReactiveClass('disabled', disabled$);

    return {};
  },
});



