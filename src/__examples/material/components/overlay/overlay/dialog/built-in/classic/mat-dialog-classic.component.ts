import { createMulticastSource, first$$, IObserver, let$$, merge } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { NODE_REFERENCE_MODIFIER } from '../../../../../../modifiers/node-reference.modifier';
import { throwIfNotAnAbortError } from '../../../helpers/throw-if-not-an-abort-error';
import { MatDialogContainerComponent } from '../../components/container/mat-dialog-container.component';
import { MatDialogAnimated } from '../../controllers/mat-dialog-animated';
import { IMatDialogComponentUserCloseType, IMatDialogVirtualCustomElementNode, MatDialogComponent } from '../../mat-dialog.component';

// @ts-ignore
import html from './mat-dialog-classic.component.html?raw';
// @ts-ignore
import style from './mat-dialog-classic.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-classic'
 */

interface IData {
  readonly $matDialogRef: IObserver<IMatDialogVirtualCustomElementNode>;
  readonly $onUserClose: IObserver<IMatDialogComponentUserCloseType>;
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
    const { emit: $matDialogRef, subscribe: matDialogRef$ } = let$$<IMatDialogVirtualCustomElementNode>();
    const { emit: $onUserClose, subscribe: onUserClose$ } = createMulticastSource<IMatDialogComponentUserCloseType>();
    const { emit: $onClickCloseIcon, subscribe: onClickCloseIcon$ } = createMulticastSource<MouseEvent>();

    const onCloseTriggered$ = first$$(
      merge([
        onUserClose$,
        onClickCloseIcon$,
        node.inputs.get$('close'),
      ]),
    );

    matDialogRef$((matDialogNode: IMatDialogVirtualCustomElementNode) => {
      const controller = new MatDialogAnimated({
        node: matDialogNode,
      });

      controller.open().catch(throwIfNotAnAbortError);

      onCloseTriggered$((): void => {
        matDialogNode.elementNode.style.pointerEvents = 'none';

        controller.close()
          .then(() => {
            node.parentNode!.detach();
            node.outputs.set('close', void 0);
          })
          .catch(throwIfNotAnAbortError);
      });
    });

    return {
      $matDialogRef,
      $onUserClose,
      $onClickCloseIcon,
    };
  },
});
