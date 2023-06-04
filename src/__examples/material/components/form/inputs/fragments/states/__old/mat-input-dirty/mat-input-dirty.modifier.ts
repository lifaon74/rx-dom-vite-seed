import { IObserver, map$$, shareRL$$ } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { observeInputDirty } from './observe-input-dirty';

// @ts-ignore
import style from './mat-input-dirty.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatInputDirtyOptions {
  $dirty?: IObserver<boolean>;
}

export type IMatInputDirtyModifierInput =
  | IMatInputDirtyOptions['$dirty']
  | IMatInputDirtyOptions
  ;

export function matInputDirtyModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  input: IMatInputDirtyModifierInput = {},
): VirtualDOMNode {

  const element: Element = node.elementNode;

  if (
    (element instanceof HTMLInputElement)
    || (element instanceof HTMLTextAreaElement)
  ) {
    componentStyle(node);

    let $dirty: IObserver<boolean> | undefined;

    if (typeof input === 'function') {
      $dirty = input;
    } else {
      $dirty = input.$dirty;
    }

    const dirty$ = shareRL$$(observeInputDirty(element));

    if ($dirty !== void 0) {
      node.onConnected$(dirty$)($dirty);
    }

    const classNames$ = map$$(dirty$, (dirty: boolean): Set<string> => {
      return new Set([dirty ? 'mat--dirty' : 'mat--pristine']);
    });
    node.setReactiveClassNamesList(classNames$);

    return node;
  } else {
    throw new Error(`Not an <input> or <textarea>`);
  }

}

export const MatInputDirtyModifier = createVirtualReactiveElementNodeModifier<IMatInputDirtyModifierInput | undefined, VirtualDOMNode>('mat-input-dirty', matInputDirtyModifierFunction, { weight: 10 });

