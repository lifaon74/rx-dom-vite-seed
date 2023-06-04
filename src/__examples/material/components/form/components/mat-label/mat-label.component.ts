import { IObservable, map$$, single, switchMap$$ } from '@lirx/core';
import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE, VirtualCustomElementNode } from '@lirx/dom';
import { IGenericFormInput } from '../../form-control/form-input/form-input.class';

// @ts-ignore
import style from './mat-label.component.scss?inline';

/**
 * COMPONENT: 'mat-label'
 */

export type IMatLabelController = IGenericFormInput & {
  required$?: IObservable<boolean>;
};

interface IMatLabelComponentConfig {
  element: HTMLLabelElement;
  inputs: [
    ['controller', IMatLabelController],
  ];
}

export const MatLabelComponent = createComponent<IMatLabelComponentConfig>({
  name: 'mat-label',
  extends: 'label',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  inputs: [
    ['controller'],
  ],
  init: (node: VirtualCustomElementNode<IMatLabelComponentConfig>): void => {
    const controller$ = node.inputs.get$('controller');

    const id$ = map$$(controller$, controller => controller.id);
    node.setReactiveProperty('htmlFor', id$);

    const required$ = switchMap$$(controller$, controller => controller.required$ ?? single(false));
    node.setReactiveClass('mat--required', required$);
  },
});



