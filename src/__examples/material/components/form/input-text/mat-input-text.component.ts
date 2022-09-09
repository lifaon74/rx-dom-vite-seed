import { IObservable } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent, IComponent,
  ICreateComponentOptions,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { MatRippleComponent } from '../ripple/mat-ripple.component';

// @ts-ignore
import html from './mat-input-text.component.html?raw';
// @ts-ignore
import style from './mat-input-text.component.scss?inline';

/**
 * COMPONENT: 'mat-button'
 */

interface IData {
  readonly disabled$: IObservable<boolean>;
}

interface IMatButtonComponentConfig {
  element: HTMLButtonElement;
  inputs: [
    ['disabled', boolean],
  ];
  data: IData;
}

export interface ICreateMatButtonComponentOptions extends Pick<ICreateComponentOptions<IMatButtonComponentConfig>, 'name' | 'styles'> {

}

export function createMatButtonComponent(
  {
    name,
    styles = [],
  }: ICreateMatButtonComponentOptions,
): IComponent<IMatButtonComponentConfig> {
  return createComponent<IMatButtonComponentConfig>({
    name,
    extends: 'button',
    template: compileReactiveHTMLAsComponentTemplate({
      html,
      customElements: [
        MatRippleComponent,
      ],
    }),
    styles: [
      compileStyleAsComponentStyle(style),
      ...styles,
    ],
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
}

export const MatInputTextComponent = createMatButtonComponent({
  name: 'mat-button',
});



