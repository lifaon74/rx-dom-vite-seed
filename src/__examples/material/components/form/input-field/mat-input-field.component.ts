import { IObservable } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent, IComponent,
  ICreateComponentOptions,
  VirtualCustomElementNode,
} from '@lirx/dom';

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
  // inputs: [
  //   ['disabled', boolean],
  // ];
  data: IData;
}

export const MatInputFieldComponent = createComponent<IMatInputFieldComponentConfig>({
  name: 'mat-input-field',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
    ],
  }),
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  // inputs: [
  //   ['disabled', false],
  // ],
  init: (node: VirtualCustomElementNode<IMatInputFieldComponentConfig>): IData => {

    return {
    };
  },
});



