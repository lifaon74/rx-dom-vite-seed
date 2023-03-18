import {
  filter$$,
  first$$,
  focusLeaveElementObservable,
  fromEventTarget,
  fromSelfEventTarget,
  IMapFilterMapFunctionReturn,
  IObservable,
  IObserver,
  let$$,
  map$$,
  MAP_FILTER_DISCARD,
  mapFilter$$,
  merge,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { NODE_REFERENCE_MODIFIER } from '@lirx/dom-material';
import {
  elementOrVirtualReactiveElementNodeToElement,
} from '../../../../../../functions/element-or-virtual-reactive-element-node-to-element';
import {
  IMatOverlayBoxStickyElement,
  IMatOverlayBoxStickyVirtualCustomElementNode,
  MatOverlayBoxStickyComponent,
} from '../../components/sticky/mat-overlay-box-sticky.component';
import { MatOverlayBoxAnimated } from '../../controllers/mat-overlay-box-animated';

// @ts-ignore
import html from './mat-menu.component.html?raw';
// @ts-ignore
import style from './mat-menu.component.scss?inline';

/**
 * COMPONENT: 'mat-menu'
 */

export type IMatMenuComponentElement = IMatOverlayBoxStickyElement;

export type IMatMenuComponentUserCloseType =
  | 'backdrop'
  | 'escape'
  | 'focusout'
  ;

interface IData {
  readonly $matOverlayBoxStickyRef: IObserver<IMatOverlayBoxStickyVirtualCustomElementNode>;
  readonly element$: IObservable<IMatMenuComponentElement>;
}

interface IMatMenuComponentConfig {
  element: HTMLElement;
  inputs: [
    ['element', IMatMenuComponentElement],
    ['close', void],
  ];
  outputs: [
    ['close', void],
  ];
  data: IData;
}

export type IMatMenuVirtualCustomElementNode = VirtualCustomElementNode<IMatMenuComponentConfig>;

export const MatMenuComponent = createComponent<IMatMenuComponentConfig>({
  name: 'mat-menu',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatOverlayBoxStickyComponent,
    ],
    modifiers: [
      NODE_REFERENCE_MODIFIER,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['element'],
    ['close'],
  ],
  outputs: [
    'close',
  ],
  init: (node: IMatMenuVirtualCustomElementNode): IData => {
    const element: HTMLElement = node.elementNode;

    const element$ = node.inputs.get$('element');
    const close$ = node.inputs.get$('close');

    const [$matOverlayBoxStickyRef, matOverlayBoxStickyRef$] = let$$<IMatOverlayBoxStickyVirtualCustomElementNode>();

    const onClickBackground$ = fromSelfEventTarget<'click', MouseEvent>(element, 'click');

    const onKeyDown$ = fromEventTarget<'keydown', KeyboardEvent>(element, 'keydown');

    const onFocusOut$ = focusLeaveElementObservable(element);

    /* NAVIGATE */

    const $arrowDown = filter$$(onKeyDown$, (event: KeyboardEvent): boolean => (event.key === 'ArrowDown'));
    const $arrowUp = filter$$(onKeyDown$, (event: KeyboardEvent): boolean => (event.key === 'ArrowUp'));

    const getInputElement = (): HTMLElement => {
      return elementOrVirtualReactiveElementNodeToElement(node.inputs.get('element'));
    };

    const focusInputElement = (): void => {
      getInputElement().focus();
    };

    const focusNextElement = (
      step: 1 | -1,
    ): void => {
      const activeElement: Element | null = document.activeElement;
      const focusableElements: HTMLElement[] = Array.from(element.querySelectorAll<HTMLElement>(`:scope > mat-overlay-box-sticky > [tabindex]:not([tabindex="-1"])`));
      const focusedElementIndex: number = focusableElements.findIndex((element: HTMLElement) => (element === activeElement));

      const nextIndex: number = getNextIndex(
        focusedElementIndex,
        focusableElements.length,
        step,
      );

      if (nextIndex === -1) {
        focusInputElement();
      } else {
        focusableElements[nextIndex].focus();
      }
    };

    $arrowDown(() => {
      focusNextElement(+1);
    });

    $arrowUp(() => {
      focusNextElement(-1);
    });

    /* CLOSE */

    const userCloseBackground$ = map$$(onClickBackground$, (): IMatMenuComponentUserCloseType => 'backdrop');

    const userCloseWithEscape$ = mapFilter$$(onKeyDown$, (event: KeyboardEvent): IMapFilterMapFunctionReturn<IMatMenuComponentUserCloseType> => {
      return (event.key === 'Escape')
        ? 'escape'
        : MAP_FILTER_DISCARD;
    });

    const userCloseWithFocusOut$ = map$$(onFocusOut$, (): IMatMenuComponentUserCloseType => 'focusout');

    const onCloseTriggered$ = first$$(
      merge([
        userCloseBackground$,
        userCloseWithEscape$,
        userCloseWithFocusOut$,
        close$,
      ]),
    );

    const unsubscribeOfMatOverlayBoxStickyRef = matOverlayBoxStickyRef$((matOverlayBoxStickyNode: IMatOverlayBoxStickyVirtualCustomElementNode): void => {
      unsubscribeOfMatOverlayBoxStickyRef();

      const controller = new MatOverlayBoxAnimated({
        node: matOverlayBoxStickyNode,
      });

      controller.open();

      const unsubscribeOfClose = onCloseTriggered$((): void => {
        unsubscribeOfClose();
        element.style.pointerEvents = 'none';
        focusInputElement();

        controller.close()
          .then(() => {
            node.parentNode!.detach();
            node.outputs.set('close', void 0);
          });
      });
    });

    /* INITIAL FOCUS */

    element.tabIndex = 0;

    node.isConnected$((opened: boolean): void => {
      if (opened) {
        queueMicrotask(() => {
          element.focus();
        });
      }
    });

    return {
      $matOverlayBoxStickyRef,
      element$,
    };
  },
});

/** FUNCTIONS **/

function getNextIndex(
  index: number,
  length: number,
  step: number, // [-length, length]
): number {
  if (length === 0) {
    return -1;
  } else {
    if (index === -1) {
      return (step > 0)
        ? 0
        : (length - 1);
    } else {
      return ((index + step + length) % length);
    }
  }
}


