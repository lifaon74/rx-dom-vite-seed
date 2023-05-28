import { IMapFilterMapFunctionReturn, MAP_FILTER_DISCARD, mapFilter$$ } from '@lirx/core';
import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE, VirtualCustomElementNode } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog.component.scss?inline';

/** TYPES **/

export type IMatDialogComponentCloseType =
  | 'escape'
  ;

/**
 * COMPONENT: 'mat-dialog'
 *
 * Represents the "main element" of a dialog
 */

export interface IMatDialogComponentConfig {
  element: HTMLElement;
  outputs: [
    ['close', IMatDialogComponentCloseType],
  ];
}

export const MatDialogComponent = createComponent<IMatDialogComponentConfig>({
  name: 'mat-dialog',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
  outputs: [
    'close',
  ],
  init: (node: VirtualCustomElementNode<IMatDialogComponentConfig>): void => {
    /* CLOSE */

    const $close = node.outputs.$set('close');

    const escapeClose$ = mapFilter$$(
      node.on$('keydown'),
      (event: KeyboardEvent): IMapFilterMapFunctionReturn<IMatDialogComponentCloseType> => {
        return (event.key === 'Escape')
          ? 'escape'
          : MAP_FILTER_DISCARD;
      },
    );

    escapeClose$($close);

    /* FOCUS */

    node.elementNode.tabIndex = 0;

    // TODO improve later
    node.isConnected$((opened: boolean): void => {
      if (opened) {
        queueMicrotask(() => {
          node.elementNode.focus();
        });
      }
    });
  },
});
