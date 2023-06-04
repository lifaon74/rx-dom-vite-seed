import { IObservableLike, switchMap$$, toObservableThrowIfUndefined } from '@lirx/core';
import { createVirtualReactiveElementNodeModifier, IGenericVirtualReactiveElementNode, VirtualDOMNode } from '@lirx/dom';
import { IGenericFormInput } from '../../../../form-control/form-input/form-input.class';

export type IMatInputStateHasErrorModifierInout = [
  controllerLike$: IObservableLike<IGenericFormInput>,
  errorName: string,
];

export function matInputStateHasErrorModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  [
    controllerLike$,
    errorName,
  ]: IMatInputStateHasErrorModifierInout,
): VirtualDOMNode {
  const controller$ = toObservableThrowIfUndefined(controllerLike$);

  const hasError$ = switchMap$$(controller$, controller => controller.hasError$(errorName));

  node.setReactiveClass(`mat--has-error-${errorName}`, hasError$);

  return node;

}

export const MatInputStateHasErrorModifier = createVirtualReactiveElementNodeModifier<IMatInputStateHasErrorModifierInout, VirtualDOMNode>(
  'mat-input-state-has-error',
  matInputStateHasErrorModifierFunction,
);

