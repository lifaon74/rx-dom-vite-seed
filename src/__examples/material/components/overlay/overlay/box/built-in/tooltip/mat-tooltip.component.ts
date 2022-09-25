import { IObservable, IObserver, let$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { NODE_REFERENCE_MODIFIER } from '@lirx/dom-material';
import {
  IMatOverlayBoxStickyElement,
  IMatOverlayBoxStickyVirtualCustomElementNode,
  MatOverlayBoxStickyComponent,
} from '../../components/sticky/mat-overlay-box-sticky.component';
import { MatOverlayBoxAnimated } from '../../controllers/mat-overlay-box-animated';

// @ts-ignore
import html from './mat-tooltip.component.html?raw';
// @ts-ignore
import style from './mat-tooltip.component.scss?inline';

/**
 * COMPONENT: 'mat-tooltip'
 */

export type IMatTooltipComponent = IMatOverlayBoxStickyElement;

interface IData {
  readonly $matOverlayBoxStickyRef: IObserver<IMatOverlayBoxStickyVirtualCustomElementNode>;
  readonly element$: IObservable<IMatTooltipComponent>;
}

interface IMatTooltipComponentConfig {
  element: HTMLElement;
  inputs: [
    ['element', IMatTooltipComponent],
    ['close', void],
  ];
  data: IData;
}

export type IMatTooltipVirtualCustomElementNode = VirtualCustomElementNode<IMatTooltipComponentConfig>;

export const MatTooltipComponent = createComponent<IMatTooltipComponentConfig>({
  name: 'mat-tooltip',
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
  init: (node: IMatTooltipVirtualCustomElementNode): IData => {
    const element$ = node.inputs.get$('element');
    const close$ = node.inputs.get$('close');

    const [$matOverlayBoxStickyRef, matOverlayBoxStickyRef$] = let$$<IMatOverlayBoxStickyVirtualCustomElementNode>();

    const unsubscribeOfMatOverlayBoxStickyRef = matOverlayBoxStickyRef$((matOverlayBoxStickyNode: IMatOverlayBoxStickyVirtualCustomElementNode): void => {
      unsubscribeOfMatOverlayBoxStickyRef();

      const controller = new MatOverlayBoxAnimated({
        node: matOverlayBoxStickyNode,
      });

      controller.open();

      const unsubscribeOfClose = close$((): void => {
        unsubscribeOfClose();

        controller.close()
          .then(() => {
            node.detach();
          });
      });
    });

    return {
      $matOverlayBoxStickyRef,
      element$,
    };
  },
});


