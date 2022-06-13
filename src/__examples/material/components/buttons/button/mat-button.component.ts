import { IObservable } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  ICreateComponentOptions,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { MatRippleComponent } from '../ripple/mat-ripple.component';

// @ts-ignore
import html from './mat-button.component.html?raw';
// @ts-ignore
import style from './mat-button.component.scss?inline';

/**
 * COMPONENT: 'mat-button'
 */

interface IData {
  readonly disabled$: IObservable<boolean>;
}

export interface IMatButtonComponentConfig {
  element: HTMLButtonElement;
  inputs: [
    ['disabled', boolean],
  ];
  data: IData;
}

export const MAT_BUTTON_COMPONENT_OPTIONS: ICreateComponentOptions<IMatButtonComponentConfig> = {
  name: 'mat-button',
  extends: 'button',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatRippleComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['disabled', false],
  ],
  init: (node: VirtualCustomElementNode<IMatButtonComponentConfig>): IData => {
    const disabled$ = node.inputs.get$('disabled');

    node.setReactiveProperty('disabled', disabled$);

    return {
      disabled$,
    };
  },
};

export const MatButtonComponent = createComponent<IMatButtonComponentConfig>(MAT_BUTTON_COMPONENT_OPTIONS);
