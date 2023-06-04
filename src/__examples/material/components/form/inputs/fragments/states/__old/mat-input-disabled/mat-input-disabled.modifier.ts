import { createObjectPropertyObservable, IObserver, map$$ } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-input-disabled.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatInputDisabledOptions {
  $disabled?: IObserver<boolean>;
}

export type IMatInputDisabledModifierInput =
  | IMatInputDisabledOptions['$disabled']
  | IMatInputDisabledOptions
  ;

export function matInputDisabledModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  input: IMatInputDisabledModifierInput = {},
): VirtualDOMNode {

  const element: Element = node.elementNode;

  if (
    (element instanceof HTMLInputElement)
    || (element instanceof HTMLTextAreaElement)
  ) {
    componentStyle(node);

    let $disabled: IObserver<boolean> | undefined;

    if (typeof input === 'function') {
      $disabled = input;
    } else {
      $disabled = input.$disabled;
    }

    const disabled$ = createObjectPropertyObservable(element, 'disabled', { allowGetters: 'allow' });

    if ($disabled !== void 0) {
      node.onConnected$(disabled$)($disabled);
    }

    const classNames$ = map$$(disabled$, (disabled: boolean): Set<string> => {
      return new Set([disabled ? 'mat--disabled' : 'mat--enabled']);
    });
    node.setReactiveClassNamesList(classNames$);

    return node;
  } else {
    throw new Error(`Not an <input> or <textarea>`);
  }

}

export const MatInputDisabledModifier = createVirtualReactiveElementNodeModifier<IMatInputDisabledModifierInput | undefined, VirtualDOMNode>('mat-input-disabled', matInputDisabledModifierFunction, { weight: 70 });

