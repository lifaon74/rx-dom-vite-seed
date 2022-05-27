import { IObservable } from '@lirx/core';
import { createComponent } from '../../../../../component/create/create-component';
import { compileStyleAsComponentStyle } from '../../../../../component/style/compile-style-as-component-style';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../../component/template/compile-reactive-html-as-component-template';
import { VirtualCustomElementNode } from '../../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
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

interface IMatButtonComponentConfig {
  element: HTMLButtonElement;
  inputs: [
    ['disabled', false],
  ];
  data: IData;
}

export const MatButtonComponent = createComponent<IMatButtonComponentConfig>({
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
});
