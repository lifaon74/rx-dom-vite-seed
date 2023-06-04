import { IObservableLike, map$$, switchMap$$, toObservableThrowIfUndefined } from '@lirx/core';
import { createVirtualReactiveElementNodeModifier, IGenericVirtualReactiveElementNode, VirtualDOMNode } from '@lirx/dom';
import { IGenericFormInput } from '../../../../form-control/form-input/form-input.class';

export function matInputStateInvalidModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  controllerLike$: IObservableLike<IGenericFormInput>,
): VirtualDOMNode {
  const controller$ = toObservableThrowIfUndefined(controllerLike$);

  const isValid$ = switchMap$$(controller$, controller => controller.isValid$);

  const classNames$ = map$$(isValid$, (valid: boolean): Set<string> => {
    return new Set([valid ? 'mat--valid' : 'mat--invalid']);
  });
  node.setReactiveClassNamesList(classNames$);

  return node;

}

export const MatInputStateInvalidModifier = createVirtualReactiveElementNodeModifier<IObservableLike<IGenericFormInput>, VirtualDOMNode>(
  'mat-input-state-invalid',
  matInputStateInvalidModifierFunction,
);

