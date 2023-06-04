import { IObservable, switchMap$$ } from '@lirx/core';
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
import html from './mat-error-pattern.component.html?raw';
// @ts-ignore
import style from './mat-error-pattern.component.scss?inline';

/**
 * COMPONENT: 'mat-error-pattern'
 */

export type IMatErrorPatternComponentController = IGenericFormInput & {
  pattern$: IObservable<RegExp | undefined>;
}

interface IData {
  pattern$: IObservable<RegExp | undefined>;
}

interface IMatErrorPatternComponentConfig {
  element: HTMLElement;
  inputs: [
    ['controller', IMatErrorPatternComponentController],
  ];
  data: IData;
}

export const MatErrorPatternComponent = createComponent<IMatErrorPatternComponentConfig>({
  name: 'mat-error-pattern',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  inputs: [
    ['controller'],
  ],
  init: (node: VirtualCustomElementNode<IMatErrorPatternComponentConfig>): IData => {
    const controller$ = node.inputs.get$('controller');

    matInputStateHasErrorModifierFunction(node, [controller$, 'pattern']);

    const pattern$ = switchMap$$(controller$, controller => controller.pattern$);

    return {
      pattern$,
    };
  },
});



