import { IObserver, map$$, shareRL$$ } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-input-touched.component.scss?inline';
import { observeInputTouched } from './observe-input-touched';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatInputTouchedOptions {
  $touched?: IObserver<boolean>;
}

export type IMatInputTouchedModifierInput =
  | IMatInputTouchedOptions['$touched']
  | IMatInputTouchedOptions
  ;

export function matInputTouchedModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  input: IMatInputTouchedModifierInput = {},
): VirtualDOMNode {

  const element: Element = node.elementNode;

  if (
    (element instanceof HTMLInputElement)
    || (element instanceof HTMLTextAreaElement)
  ) {
    componentStyle(node);

    let $touched: IObserver<boolean> | undefined;

    if (typeof input === 'function') {
      $touched = input;
    } else {
      $touched = input.$touched;
    }

    const touched$ = shareRL$$(observeInputTouched(element));

    if ($touched !== void 0) {
      node.onConnected$(touched$)($touched);
    }

    const classNames$ = map$$(touched$, (touched: boolean): Set<string> => {
      return new Set([touched ? 'mat--touched' : 'mat--untouched']);
    });
    node.setReactiveClassNamesList(classNames$);

    return node;
  } else {
    throw new Error(`Not an <input> or <textarea>`);
  }

}

export const MatInputTouchedTouchedModifier = createVirtualReactiveElementNodeModifier<IMatInputTouchedModifierInput | undefined, VirtualDOMNode>('mat-input-touched', matInputTouchedModifierFunction, { weight: 20 });

