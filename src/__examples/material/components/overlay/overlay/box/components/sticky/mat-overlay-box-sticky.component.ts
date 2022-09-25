import { IObservable, map$$, switchMap$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
  VirtualReactiveElementNode,
} from '@lirx/dom';
import { applyCSSPositionAndSize2D } from '../../types/2d/position-and-size/css/apply-css-position-and-size-2d';
import { ICSSPositionAndSize2D } from '../../types/2d/position-and-size/css/css-position-and-size-2d.type';

import {
  getCSSPositionAndSize2DObservableForMatOverlayBoxSticky,
} from './helpers/get-css-position-and-size-2d-observable-for-mat-overlay-box-sticky';

// @ts-ignore
import html from './mat-overlay-box-sticky.component.html?raw';
// @ts-ignore
import style from '../box/mat-overlay-box.component.scss?inline';

/**
 * COMPONENT: 'mat-overlay-box-sticky'
 */

export type IMatOverlayBoxStickyElement =
  | HTMLElement
  | VirtualReactiveElementNode<HTMLElement>
  ;

interface IMatOverlayBoxStickyComponentConfig {
  element: HTMLElement;
  inputs: [
    ['element', IMatOverlayBoxStickyElement]
  ];
}

export type IMatOverlayBoxStickyVirtualCustomElementNode = VirtualCustomElementNode<IMatOverlayBoxStickyComponentConfig>;

export const MatOverlayBoxStickyComponent = createComponent<IMatOverlayBoxStickyComponentConfig>({
  name: 'mat-overlay-box-sticky',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['element'],
  ],
  init: (node: VirtualCustomElementNode<IMatOverlayBoxStickyComponentConfig>): void => {
    const element$ = node.inputs.get$('element');

    const targetElement$ = map$$(element$, (value: IMatOverlayBoxStickyElement): HTMLElement => {
      return (value instanceof HTMLElement)
        ? value
        : value.elementNode;
    });

    const config$ = switchMap$$(
      targetElement$,
      (targetElement: HTMLElement): IObservable<ICSSPositionAndSize2D> => {
        return getCSSPositionAndSize2DObservableForMatOverlayBoxSticky({
          contentElement: node.elementNode,
          targetElement,
        });
      });

    node.onConnected$(config$)((positionAndSize: ICSSPositionAndSize2D): void => {
      applyCSSPositionAndSize2D(
        node.elementNode,
        positionAndSize,
      );
    });
  },
});


