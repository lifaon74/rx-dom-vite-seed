import { IObservableLike, map$$, reference, switchMap$$, toObservableThrowIfUndefined } from '@lirx/core';
import { createVirtualReactiveElementNodeModifier, IGenericVirtualReactiveElementNode, VirtualDOMNode } from '@lirx/dom';
import {
  assertIsInputOrTextAreaVirtualReactiveElementNode
} from '../../../helpers/assert-is-input-or-text-area-virtual-reactive-element-node';
import { IInputTouchedElement, observeInputTouched } from './observe-input-touched';

export function matInputStateTouchedModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  inputLike$?: IObservableLike<IInputTouchedElement>,
): VirtualDOMNode {
  let input$: IObservableLike<IInputTouchedElement>;

  if (inputLike$ === void 0) {
    assertIsInputOrTextAreaVirtualReactiveElementNode(node);
    input$ = reference(() => node.elementNode);
  } else {
    input$ = toObservableThrowIfUndefined(inputLike$);
  }

  const touched$ = switchMap$$(input$, input => observeInputTouched(input));

  const classNames$ = map$$(touched$, (touched: boolean): Set<string> => {
    return new Set([touched ? 'mat--touched' : 'mat--untouched']);
  });
  node.setReactiveClassNamesList(classNames$);

  return node;

}

export const MatInputStateTouchedModifier = createVirtualReactiveElementNodeModifier<IObservableLike<IInputTouchedElement> | undefined, VirtualDOMNode>(
  'mat-input-state-touched',
  matInputStateTouchedModifierFunction,
);

