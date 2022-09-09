import { fromSelfEventTarget, IObserver } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  querySelectorOrThrow,
  VirtualCustomElementNode,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-dialog.component.html?raw';
// @ts-ignore
import style from './mat-dialog.component.scss?inline';

/** TYPES **/

export type IMatDialogComponentUserCloseType =
  | 'backdrop'
  | 'escape'
  ;

/**
 * COMPONENT: 'mat-dialog'
 */

interface IData {
  readonly $onKeyDownMatDialogContent: IObserver<KeyboardEvent>;
}

export interface IMatDialogComponentConfig {
  element: HTMLElement;
  outputs: [
    ['userClose', IMatDialogComponentUserCloseType],
  ];
  data: IData;
}

export type IMatDialogVirtualCustomElementNode = VirtualCustomElementNode<IMatDialogComponentConfig>;

export const MatDialogComponent = createComponent<IMatDialogComponentConfig>({
  name: 'mat-dialog',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  outputs: [
    'userClose',
  ],
  init: (node: VirtualCustomElementNode<IMatDialogComponentConfig>): IData => {
    const $userClose = node.outputs.$set('userClose');

    const $onClickBackdrop = (): void => {
      $userClose('backdrop');
    };

    const $onKeyDownMatDialogContent = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        $userClose('escape');
      }
    };

    const clickBackground$ = fromSelfEventTarget<'click', MouseEvent>(node.elementNode, 'click');

    clickBackground$($onClickBackdrop);

    // TODO improve later
    node.isConnected$((opened: boolean): void => {
      if (opened) {
        queueMicrotask(() => {
          querySelectorOrThrow<HTMLElement>(node.elementNode, `:scope > .content`).focus();
        });
      }
    });

    return {
      $onKeyDownMatDialogContent,
    };
  },
});
