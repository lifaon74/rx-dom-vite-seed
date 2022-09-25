import { debounceTime$$$, distinct$$$, IUnsubscribe, mouseEnterObservable, pipe$$ } from '@lirx/core';
import {
  createVirtualDOMNodeModifier,
  IObservableLike,
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

// TODO add support for observables ?
export type IMatTooltipModifierInput =
  | [IObservableLike<'string'>]
  | IVirtualCustomElementNodeSlotTemplate
  ;

function convertMatTooltipModifierInputToTemplate(
  input: IMatTooltipModifierInput,
): IVirtualCustomElementNodeSlotTemplate {
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

      const template: IVirtualCustomElementNodeSlotTemplate = convertMatTooltipModifierInputToTemplate(input);
      const element: HTMLElement = node.elementNode;

      const ariaUUID: string = uuid();
      node.setAttribute('aria-describedby', ariaUUID);

      const display$ = pipe$$(mouseEnterObservable(element), [
        debounceTime$$$<boolean>(500),
        distinct$$$<boolean>(),
      ]);

      let _unsubscribe: IUnsubscribe | undefined;
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
