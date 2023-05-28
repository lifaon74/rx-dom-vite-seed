import { fromSelfEventTarget, map$$ } from '@lirx/core';
import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE, VirtualCustomElementNode } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-container.component.scss?inline';

/** TYPES **/

export type IMatDialogContainerComponentCloseType =
  | 'backdrop'
  ;

/**
 * COMPONENT: 'mat-dialog-container'
 *
 * This is the main container for a dialog. It includes a backdrop and a "content" area (white middle space)
 */

export interface IMatDialogContainerComponentConfig {
  element: HTMLElement;
  outputs: [
    ['close', IMatDialogContainerComponentCloseType],
  ];
}

export type IMatDialogContainerVirtualCustomElementNode = VirtualCustomElementNode<IMatDialogContainerComponentConfig>;

export const MatDialogContainerComponent = createComponent<IMatDialogContainerComponentConfig>({
  name: 'mat-dialog-container',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
  outputs: [
    'close',
  ],
  init: (node: IMatDialogContainerVirtualCustomElementNode): void => {
    /* CLOSE */

    const $close = node.outputs.$set('close');

    const backdropClose$ = map$$(
      fromSelfEventTarget<'click', MouseEvent>(node.elementNode, 'click'),
      (): IMatDialogContainerComponentCloseType => 'backdrop',
    );

    backdropClose$($close);
  },
});
