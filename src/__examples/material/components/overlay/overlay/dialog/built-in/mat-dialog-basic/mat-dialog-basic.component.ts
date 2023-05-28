import { createUnicastSource, first$$, IObserver, let$$, map$$, merge } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { NodeReferenceModifier } from '@lirx/dom-material';
import {
  MatDialogBodyComponent
} from '../../components/mat-dialog-container/components/mat-dialog/components/mat-dialog-body/mat-dialog-body.component';
import {
  MatDialogFooterComponent
} from '../../components/mat-dialog-container/components/mat-dialog/components/mat-dialog-footer/mat-dialog-footer.component';
import {
  MatDialogCloseComponent
} from '../../components/mat-dialog-container/components/mat-dialog/components/mat-dialog-header/components/mat-dialog-close/mat-dialog-close.component';
import {
  MatDialogTitleComponent
} from '../../components/mat-dialog-container/components/mat-dialog/components/mat-dialog-header/components/mat-dialog-title/mat-dialog-title.component';
import {
  MatDialogHeaderComponent
} from '../../components/mat-dialog-container/components/mat-dialog/components/mat-dialog-header/mat-dialog-header.component';
import {
  IMatDialogComponentCloseType,
  MatDialogComponent,
} from '../../components/mat-dialog-container/components/mat-dialog/mat-dialog.component';
import {
  IMatDialogContainerComponentCloseType, IMatDialogContainerVirtualCustomElementNode,
  MatDialogContainerComponent,
} from '../../components/mat-dialog-container/mat-dialog-container.component';
import { MatDialogContainerAnimated } from '../../controllers/mat-dialog-container-animated';

// @ts-ignore
import html from './mat-dialog-basic.component.html?raw';
// @ts-ignore
import style from './mat-dialog-basic.component.scss?inline';

/** TYPES **/

export type IMatDialogBasicComponentCloseType =
  | IMatDialogContainerComponentCloseType
  | IMatDialogComponentCloseType
  | 'close-icon'
  | 'input'
  ;

/**
 * COMPONENT: 'mat-dialog-basic'
 */

interface IData {
  readonly $matDialogRef: IObserver<IMatDialogContainerVirtualCustomElementNode>;
  readonly $matDialogContainerClose: IObserver<IMatDialogContainerComponentCloseType>;
  readonly $matDialogClose: IObserver<IMatDialogComponentCloseType>;
  readonly $onClickCloseIcon: IObserver<MouseEvent>;
}

export interface IMatDialogBasicComponentConfig {
  element: HTMLElement;
  inputs: [
    ['close', void],
  ];
  outputs: [
    ['close', IMatDialogBasicComponentCloseType],
  ];
  data: IData;
}

export const MatDialogBasicComponent = createComponent<IMatDialogBasicComponentConfig>({
  name: 'mat-dialog-basic',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatDialogContainerComponent,
      MatDialogComponent,
      MatDialogHeaderComponent,
      MatDialogTitleComponent,
      MatDialogCloseComponent,
      MatDialogBodyComponent,
      MatDialogFooterComponent,
    ],
    modifiers: [
      NodeReferenceModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['close'],
  ],
  outputs: [
    'close',
  ],
  init: (node: VirtualCustomElementNode<IMatDialogBasicComponentConfig>): IData => {
    const close$ = node.inputs.get$('close');
    const $close = node.outputs.$set('close');

    const { emit: $matDialogRef, subscribe: matDialogRef$ } = createUnicastSource<IMatDialogContainerVirtualCustomElementNode>();
    const { emit: $matDialogContainerClose, subscribe: matDialogContainerClose$ } = createUnicastSource<IMatDialogContainerComponentCloseType>();
    const { emit: $matDialogClose, subscribe: matDialogClose$ } = createUnicastSource<IMatDialogComponentCloseType>();
    const { emit: $onClickCloseIcon, subscribe: onClickCloseIcon$ } = createUnicastSource<MouseEvent>();

    const closeIconClose$ = map$$(onClickCloseIcon$, (): IMatDialogBasicComponentCloseType => 'close-icon');
    const inputClose$ = map$$(close$, (): IMatDialogBasicComponentCloseType => 'input');


    const untilClosed$ = first$$<IMatDialogBasicComponentCloseType>(
      merge([
        matDialogContainerClose$,
        matDialogClose$,
        closeIconClose$,
        inputClose$,
      ]),
    );

    const unsubscribeOfMatDialogRef = matDialogRef$((matDialogNode: IMatDialogContainerVirtualCustomElementNode): void => {
      unsubscribeOfMatDialogRef();

      const controller = new MatDialogContainerAnimated({
        node: matDialogNode,
      });

      controller.open();

      const unsubscribeOfOnCloseTriggered = untilClosed$((closeType: IMatDialogBasicComponentCloseType): void => {
        unsubscribeOfOnCloseTriggered();
        matDialogNode.elementNode.style.pointerEvents = 'none';

        controller.close()
          .then(() => {
            node.parentNode!.detach();
            $close(closeType);
          });
      });
    });

    return {
      $matDialogRef,
      $matDialogContainerClose,
      $matDialogClose,
      $onClickCloseIcon,
    };
  },
});
