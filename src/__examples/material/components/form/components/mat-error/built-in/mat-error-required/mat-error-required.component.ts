import { switchMap$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { IGenericFormInput } from '../../../../form-control/form-input/form-input.class';
import {
  matInputStateHasErrorModifierFunction,
} from '../../../../inputs/fragments/states/mat-input-state-has-error/mat-input-state-has-error.modifier';

// @ts-ignore
import html from './mat-error-required.component.html?raw';
// @ts-ignore
import style from './mat-error-required.component.scss?inline';

/**
 * COMPONENT: 'mat-error-required'
 */

interface IMatErrorRequiredComponentConfig {
  element: HTMLElement;
  inputs: [
    ['controller', IGenericFormInput],
  ];
}

export const MatErrorRequiredComponent = createComponent<IMatErrorRequiredComponentConfig>({
  name: 'mat-error-required',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  inputs: [
    ['controller'],
  ],
  init: (node: VirtualCustomElementNode<IMatErrorRequiredComponentConfig>): void => {
    const controller$ = node.inputs.get$('controller');

    matInputStateHasErrorModifierFunction(node, [controller$, 'required']);
  },
});



