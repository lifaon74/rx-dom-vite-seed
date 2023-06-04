import { idle, IObserver, map$$, mapDistinct$$, shareRL$$ } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-input-invalid.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatInputInvalidOptions {
  $invalid?: IObserver<boolean>;
}

export type IMatInputInvalidModifierInput =
  | IMatInputInvalidOptions['$invalid']
  | IMatInputInvalidOptions
  ;

export function matInputInvalidModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  input: IMatInputInvalidModifierInput = {},
): VirtualDOMNode {

  const element: Element = node.elementNode;

  if (
    (element instanceof HTMLInputElement)
    || (element instanceof HTMLTextAreaElement)
  ) {
    componentStyle(node);

    let $invalid: IObserver<boolean> | undefined;

    if (typeof input === 'function') {
      $invalid = input;
    } else {
      $invalid = input.$invalid;
    }

    const invalid$ = shareRL$$(mapDistinct$$(idle(), () => !element.checkValidity()));

    if ($invalid !== void 0) {
      node.onConnected$(invalid$)($invalid);
    }

    const classNames$ = map$$(invalid$, (invalid: boolean): Set<string> => {
      return new Set([invalid ? 'mat--invalid' : 'mat--valid']);
    });
    node.setReactiveClassNamesList(classNames$);

    return node;
  } else {
    throw new Error(`Not an <input> or <textarea>`);
  }

}

export const MatInputInvalidModifier = createVirtualReactiveElementNodeModifier<IMatInputInvalidModifierInput | undefined, VirtualDOMNode>('mat-input-invalid', matInputInvalidModifierFunction, { weight: 50 });

