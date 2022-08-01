import { combineLatest, createMulticastSource, first$$, IObservable, IObserver, let$$, merge, switchMap$$, noop, tuple } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  IGenericVirtualCustomElementNode,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { NODE_REFERENCE_MODIFIER } from '../../../../../../modifiers/node-reference.modifier';
import { closeMatOverlayWithAnimation } from '../../../helpers/close-mat-overlay-with-animation';
import { openMatOverlayWithAnimation } from '../../../helpers/open-mat-overlay-with-animation';
import { MatDialogContainerComponent } from '../../components/container/mat-dialog-container.component';
import { MatDialogComponent } from '../../mat-dialog.component';

// @ts-ignore
import html from './mat-dialog-classic.component.html?raw';
// @ts-ignore
import style from './mat-dialog-classic.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-classic'
 */

interface IData {
  readonly $matDialogRef: IObserver<IGenericVirtualCustomElementNode>;
  readonly $onUserClose: IObserver<MouseEvent>;
  readonly $onClickCloseIcon: IObserver<MouseEvent>;
}

export interface IMatDialogClassicComponentConfig {
  element: HTMLElement;
  inputs: [
    ['close', void],
  ];
  outputs: [
    ['close', void],
  ];
  data: IData;
}

export const MatDialogClassicComponent = createComponent<IMatDialogClassicComponentConfig>({
  name: 'mat-dialog-classic',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatDialogComponent,
      MatDialogContainerComponent,
    ],
    modifiers: [
      NODE_REFERENCE_MODIFIER,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['close'],
  ],
  outputs: [
    'close',
  ],
  init: (node: VirtualCustomElementNode<IMatDialogClassicComponentConfig>): IData => {
    const { emit: $matDialogRef, subscribe: matDialogRef$ } = let$$<IGenericVirtualCustomElementNode>();
    const { emit: $onUserClose, subscribe: onUserClose$ } = createMulticastSource<MouseEvent>();
    const { emit: $onClickCloseIcon, subscribe: onClickCloseIcon$ } = createMulticastSource<MouseEvent>();

    const onCloseTriggered$ = merge([
      onUserClose$,
      onClickCloseIcon$,
      node.inputs.get$('close'),
    ]);

    const open$ = switchMap$$(matDialogRef$, openMatOverlayWithAnimation);

    const onClose$ = switchMap$$(
      first$$(combineLatest(tuple(matDialogRef$, onCloseTriggered$))),
      ([matDialogRef]): IObservable<void> => {
        return closeMatOverlayWithAnimation(matDialogRef);
      },
    );

    open$(noop);

    onClose$((): void => {
      node.parentNode!.detach();
      node.outputs.set('close', void 0);
    });

    return {
      $matDialogRef,
      $onUserClose,
      $onClickCloseIcon,
    };
  },
});
