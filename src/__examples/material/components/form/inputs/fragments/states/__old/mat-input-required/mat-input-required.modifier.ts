import { createObjectPropertyObservable, IObserver, map$$ } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-input-required.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatInputRequiredOptions {
  $required?: IObserver<boolean>;
}

export type IMatInputRequiredModifierInput =
  | IMatInputRequiredOptions['$required']
  | IMatInputRequiredOptions
  ;

export function matInputRequiredModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  input: IMatInputRequiredModifierInput = {},
): VirtualDOMNode {

  const element: Element = node.elementNode;

  if (
    (element instanceof HTMLInputElement)
    || (element instanceof HTMLTextAreaElement)
  ) {
    componentStyle(node);

    let $required: IObserver<boolean> | undefined;

    if (typeof input === 'function') {
      $required = input;
    } else {
      $required = input.$required;
    }

    const required$ = createObjectPropertyObservable(element, 'required', { allowGetters: 'allow' });

    if ($required !== void 0) {
      node.onConnected$(required$)($required);
    }

    const classNames$ = map$$(required$, (required: boolean): Set<string> => {
      return new Set([required ? 'mat--required' : 'mat--optional']);
    });
    node.setReactiveClassNamesList(classNames$);

    return node;
  } else {
    throw new Error(`Not an <input> or <textarea>`);
  }

}

export const MatInputRequiredModifier = createVirtualReactiveElementNodeModifier<IMatInputRequiredModifierInput | undefined, VirtualDOMNode>('mat-input-required', matInputRequiredModifierFunction, { weight: 30 });

