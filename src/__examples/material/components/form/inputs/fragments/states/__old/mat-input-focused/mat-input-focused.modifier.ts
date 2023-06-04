import { IObserver, isFocusedElementObservable, map$$, shareRL$$ } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-input-focused.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatInputFocusedOptions {
  $focused?: IObserver<boolean>;
}

export type IMatInputFocusedModifierInput =
  | IMatInputFocusedOptions['$focused']
  | IMatInputFocusedOptions
  ;

export function matInputFocusedModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  input: IMatInputFocusedModifierInput = {},
): VirtualDOMNode {

  const element: Element = node.elementNode;

  if (
    (element instanceof HTMLInputElement)
    || (element instanceof HTMLTextAreaElement)
  ) {
    componentStyle(node);

    let $focused: IObserver<boolean> | undefined;

    if (typeof input === 'function') {
      $focused = input;
    } else {
      $focused = input.$focused;
    }

    const focused$ = shareRL$$(isFocusedElementObservable(element));

    if ($focused !== void 0) {
      node.onConnected$(focused$)($focused);
    }

    const classNames$ = map$$(focused$, (focused: boolean): Set<string> => {
      return new Set([focused ? 'mat-focused' : 'mat-unfocused']);
    });
    node.setReactiveClassNamesList(classNames$);

    return node;
  } else {
    throw new Error(`Not an <input> or <textarea>`);
  }

}

export const MatInputFocusedModifier = createVirtualReactiveElementNodeModifier<IMatInputFocusedModifierInput | undefined, VirtualDOMNode>('mat-input-focused', matInputFocusedModifierFunction, { weight: 40 });

