import { IObservable } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent, IComponent, IComponentStyle,
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

interface IMatButtonComponentConfig {
  element: HTMLButtonElement;
  inputs: [
    ['disabled', boolean],
  ];
  data: IData;
}

export interface ICreateMatButtonComponentOptions extends Pick<ICreateComponentOptions<IMatButtonComponentConfig>, 'name' | 'styles'> {
  withButtonStyle?: boolean;
}

export function createMatButtonComponent(
  {
    name,
    styles = [],
    withButtonStyle = true,
  }: ICreateMatButtonComponentOptions,
): IComponent<IMatButtonComponentConfig> {
  const _styles: IComponentStyle[] = [...styles];
  if (withButtonStyle) {
    _styles.push(compileStyleAsComponentStyle(style));
  }
  return createComponent<IMatButtonComponentConfig>({
    name,
    extends: 'button',
    template: compileReactiveHTMLAsComponentTemplate({
      html,
      customElements: [
        MatRippleComponent,
      ],
    }),
    styles: _styles,
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

export const MatButtonComponent = createMatButtonComponent({
  name: 'mat-button',
});



