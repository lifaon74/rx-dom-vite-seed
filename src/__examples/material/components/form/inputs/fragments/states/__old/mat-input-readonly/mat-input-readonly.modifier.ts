import { createObjectPropertyObservable, IObserver, map$$ } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-input-readonly.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatInputReadonlyOptions {
  $readonly?: IObserver<boolean>;
}

export type IMatInputReadonlyModifierInput =
  | IMatInputReadonlyOptions['$readonly']
  | IMatInputReadonlyOptions
  ;

export function matInputReadonlyModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  input: IMatInputReadonlyModifierInput = {},
): VirtualDOMNode {

  const element: Element = node.elementNode;

  if (
    (element instanceof HTMLInputElement)
    || (element instanceof HTMLTextAreaElement)
  ) {
    componentStyle(node);

    let $readonly: IObserver<boolean> | undefined;

    if (typeof input === 'function') {
      $readonly = input;
    } else {
      $readonly = input.$readonly;
    }

    const readonly$ = createObjectPropertyObservable(element, 'readOnly', { allowGetters: 'allow' });

    if ($readonly !== void 0) {
      node.onConnected$(readonly$)($readonly);
    }

    const classNames$ = map$$(readonly$, (readonly: boolean): Set<string> => {
      return new Set([readonly ? 'mat--readonly' : 'mat--read-write']);
    });
    node.setReactiveClassNamesList(classNames$);

    return node;
  } else {
    throw new Error(`Not an <input> or <textarea>`);
  }

}

export const MatInputReadonlyModifier = createVirtualReactiveElementNodeModifier<IMatInputReadonlyModifierInput | undefined, VirtualDOMNode>('mat-input-readonly', matInputReadonlyModifierFunction, { weight: 60 });

