import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';
import { applyCSSPositionAndSize2D } from '../../types/2d/position-and-size/css/apply-css-position-and-size-2d';
import { ICSSPositionAndSize2D } from '../../types/2d/position-and-size/css/css-position-and-size-2d.type';

// @ts-ignore
import html from './mat-overlay-box.component.html?raw';
// @ts-ignore
import style from './mat-overlay-box.component.scss?inline';

/**
 * COMPONENT: 'mat-overlay-box'
 */

interface IMatOverlayBoxComponentConfig {
  element: HTMLElement;
  inputs: [
    ['config', ICSSPositionAndSize2D]
  ];
}

export type IMatOverlayBoxVirtualCustomElementNode = VirtualCustomElementNode<IMatOverlayBoxComponentConfig>;

export const MatOverlayBoxComponent = createComponent<IMatOverlayBoxComponentConfig>({
  name: 'mat-overlay-box',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['config'],
  ],
  init: (node: VirtualCustomElementNode<IMatOverlayBoxComponentConfig>): void => {
    const config$ = node.inputs.get$('config');

    node.onConnected$(config$)((positionAndSize: ICSSPositionAndSize2D): void => {
      applyCSSPositionAndSize2D(
        node.elementNode,
        positionAndSize,
      );
    });
  },
});


