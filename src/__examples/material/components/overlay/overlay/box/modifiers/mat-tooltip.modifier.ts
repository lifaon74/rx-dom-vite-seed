import { debounceTime$$$, distinct$$$, IObservableLike, isMouseOverElementObservable, IUnsubscribeOfObservable, pipe$$ } from '@lirx/core';
import {
  createVirtualDOMNodeModifier,
  IVirtualCustomElementNodeSlotTemplate,
  IVirtualDOMNodeModifier,
  toObservableThrowIfUndefined,
  uuid,
  VirtualDOMNode,
  VirtualReactiveElementNode,
  VirtualReactiveTextNode,
} from '@lirx/dom';
import { getGlobalMatOverlayManager } from '../../../manager/functions/global-mat-overlay-manager';
import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import { IMatTooltipVirtualCustomElementNode, MatTooltipComponent } from '../built-in/tooltip/mat-tooltip.component';

export type IMatTooltipModifierInput =
  | [IObservableLike<'string'>]
  | IVirtualCustomElementNodeSlotTemplate<object>
  ;

function convertMatTooltipModifierInputToTemplate(
  input: IMatTooltipModifierInput,
): IVirtualCustomElementNodeSlotTemplate<object> {
  if (Array.isArray(input)) {
    return (
      parentNode: VirtualDOMNode,
    ): void => {
      new VirtualReactiveTextNode(toObservableThrowIfUndefined(input[0])).attach(parentNode);
    };
  } else if (typeof input === 'function') {
    return input;
  } else {
    throw new Error(`Not a IMatTooltipModifierInput`);
  }
}

/*--*/

export interface IGetMatOverlayManagerComponentReferenceFunction {
  (): MatOverlayManager;
}

export function createMatTooltipModifier(
  managerRef: IGetMatOverlayManagerComponentReferenceFunction,
): IVirtualDOMNodeModifier<IMatTooltipModifierInput, VirtualDOMNode> {
  return createVirtualDOMNodeModifier('tooltip', (
    node: VirtualDOMNode,
    input: IMatTooltipModifierInput,
  ): VirtualDOMNode => {
    if (node instanceof VirtualReactiveElementNode) {

      const template: IVirtualCustomElementNodeSlotTemplate<object> = convertMatTooltipModifierInputToTemplate(input);
      const element: HTMLElement = node.elementNode;

      const ariaUUID: string = uuid();
      node.setAttribute('aria-describedby', ariaUUID);

      const display$ = pipe$$(isMouseOverElementObservable(element), [
        debounceTime$$$<boolean>(500),
        distinct$$$<boolean>(),
      ]);

      let _unsubscribe: IUnsubscribeOfObservable | undefined;
      let overlay: IMatTooltipVirtualCustomElementNode | undefined;

      const close = () => {
        if (overlay !== void 0) {
          overlay.inputs.set('close', void 0);
          overlay = void 0;
        }
      };

      const unsubscribe = () => {
        if (_unsubscribe !== void 0) {
          _unsubscribe();
          _unsubscribe = void 0;
        }
      };

      node.isConnected$((connected: boolean): void => {
        if (connected) {
          _unsubscribe = display$((display: boolean): void => {
            if (display) {
              overlay = managerRef().open(MatTooltipComponent, new Map([['*', template]]));
              overlay.inputs.set('element', node);
              overlay.setProperty('id', ariaUUID);
              overlay.setAttribute('role', 'tooltip');
            } else {
              close();
            }
          });
        } else {
          unsubscribe();
          close();
        }
      });

      return node;
    } else {
      throw new Error(`Not an input element`);
    }
  });
}

/*--*/

export const MAT_TOOLTIP_MODIFIER = createMatTooltipModifier(getGlobalMatOverlayManager);
