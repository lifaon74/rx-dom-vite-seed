import { IObservable, IObservableLike, map$$, switchMap$$, toObservableThrowIfUndefined } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
  virtualNodeSubscribeToObservableWithObservableOfObservers,
} from '@lirx/dom';
import { IGenericFormInput } from '../../../form-control/form-input/form-input.class';
import {
  assertIsInputOrTextAreaVirtualReactiveElementNode,
} from '../../helpers/assert-is-input-or-text-area-virtual-reactive-element-node';
import { observeInputDirty } from '../states/mat-input-state-dirty/observe-input-dirty';
import { observeInputTouched } from '../states/mat-input-state-touched/observe-input-touched';

// @ts-ignore
import style from './mat-input-field.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export function matInputFieldModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  controllerLike$: IObservableLike<IGenericFormInput>,
): VirtualDOMNode {
  assertIsInputOrTextAreaVirtualReactiveElementNode(node);

  node.setClass('mat-input-field', true);

  componentStyle(node);

  const controller$ = toObservableThrowIfUndefined(controllerLike$);

  const id$ = map$$(controller$, controller => controller.id);
  node.setReactiveProperty('id', id$);

  const name$ = map$$(controller$, controller => controller.name);
  node.setReactiveProperty('name', name$);

  const disabled$ = switchMap$$(controller$, controller => controller.disabled$);
  node.setReactiveProperty('disabled', disabled$);

  const readonly$ = switchMap$$(controller$, controller => controller.readonly$);
  node.setReactiveProperty('readOnly', readonly$);

  /* DIRTY */
  {
    const userDirty$ = observeInputDirty(node.elementNode);
    const $dirty = map$$(controller$, controller => controller.$dirty);
    virtualNodeSubscribeToObservableWithObservableOfObservers(node, userDirty$, $dirty);

    const dirty$ = switchMap$$(controller$, controller => controller.dirty$);
    const classNames$ = map$$(dirty$, (dirty: boolean): Set<string> => {
      return new Set([dirty ? 'mat--dirty' : 'mat--pristine']);
    });
    node.setReactiveClassNamesList(classNames$);
  }

  /* TOUCHED */
  {
    const userTouched$ = observeInputTouched(node.elementNode);
    const $touched = map$$(controller$, controller => controller.$touched);
    virtualNodeSubscribeToObservableWithObservableOfObservers(node, userTouched$, $touched);

    const touched$ = switchMap$$(controller$, controller => controller.touched$);
    const classNames$ = map$$(touched$, (touched: boolean): Set<string> => {
      return new Set([touched ? 'mat--touched' : 'mat--untouched']);
    });
    node.setReactiveClassNamesList(classNames$);
  }


  return node;
}

export const MatInputFieldModifier = createVirtualReactiveElementNodeModifier<IObservableLike<IGenericFormInput>, VirtualDOMNode>(
  'mat-input-field',
  matInputFieldModifierFunction,
);

