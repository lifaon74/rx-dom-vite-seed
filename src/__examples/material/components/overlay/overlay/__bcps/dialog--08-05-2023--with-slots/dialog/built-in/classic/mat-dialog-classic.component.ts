import { createMulticastSource, first$$, IObserver, let$$, merge } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { NODE_REFERENCE_MODIFIER } from '@lirx/dom-material';
import { MatDialogContainerComponent } from '../../components/container/mat-dialog-container.component';
import {
  IMatDialogComponentUserCloseType,
  IMatDialogVirtualCustomElementNode,
  MatDialogComponent,
} from '../../components/dialog/mat-dialog.component';
import { MatDialogAnimated } from '../../controllers/mat-dialog-animated';

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
    const close$ = node.inputs.get$('close');
    const [$matDialogRef, matDialogRef$] = let$$<IMatDialogVirtualCustomElementNode>();
    const { emit: $onUserClose, subscribe: onUserClose$ } = createMulticastSource<IMatDialogComponentUserCloseType>();
    const { emit: $onClickCloseIcon, subscribe: onClickCloseIcon$ } = createMulticastSource<MouseEvent>();

    const onCloseTriggered$ = first$$(
      merge([
        onUserClose$,
        onClickCloseIcon$,
        close$,
      ]),
    );

    const unsubscribeOfMatDialogRef = matDialogRef$((matDialogNode: IMatDialogVirtualCustomElementNode): void => {
      unsubscribeOfMatDialogRef();

      const controller = new MatDialogAnimated({
        node: matDialogNode,
      });

      controller.open();

      const unsubscribeOfOnCloseTriggered = onCloseTriggered$((): void => {
        unsubscribeOfOnCloseTriggered();
        matDialogNode.elementNode.style.pointerEvents = 'none';

        controller.close()
          .then(() => {
            node.parentNode!.detach();
            node.outputs.set('close', void 0);
          });
      });
    });

    return {
      $matDialogRef,
      $onUserClose,
      $onClickCloseIcon,
    };
  },
});
