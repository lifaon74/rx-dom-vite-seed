import {
  createMulticastSource,
  first$$, fromEventTarget,
  fromSelfEventTarget, IMapFilterMapFunctionReturn,
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
  filter$$
} from '../../../../../../../../../../lirx/core/dist/src/observable/pipes/built-in/without-notifications/observer-pipe-related/filter/filter-observable.shortcut';
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

    const onFocusOut$ = fromEventTarget<'focusout', Event>(element, 'focusout');



    /* NAVIGATE */

    const $arrowUp = filter$$(onKeyDown$, (event: KeyboardEvent): boolean => (event.key === 'ArrowUp'));
    const $arrowDown = filter$$(onKeyDown$, (event: KeyboardEvent): boolean => (event.key === 'ArrowDown'));

    // $arrowDown(() => {
    //   console.log('down');
    //   const activeElement = document.activeElement;
    //   if (
    //     (activeElement !== null)
    //     && element.contains()
    //   ) {
    //
    //   }
    // });

    // TODO navigate with arrow down and up
    // TODO support focusout

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

        controller.close()
          .then(() => {
            node.detach();
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


