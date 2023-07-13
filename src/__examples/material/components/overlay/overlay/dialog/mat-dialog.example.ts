import { $log, IObservable, IObserver, single, switchMap$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent, VirtualCustomElementNode } from '@lirx/dom';
import {
  createMatOverlayCloseObserver, getMatOverlayData$$,
  IMatDialogBasicComponentCloseType, IMatOverlayFactoryOpenOptions, IMatOverlayInput,
  MAT_OVERLAY_INPUT_NAME,
  MatButtonModifier,
  MatDialogBasicComponent, MatDialogFactory,
  MatFlatButtonPrimaryModifier,
} from '@lirx/dom-material';

/*----------------------------*/

interface IData {
  readonly $userClose: IObservable<IObserver<IMatDialogBasicComponentCloseType>>;
  readonly text$: IObservable<string>;
  readonly $onClickCancelButton: IObservable<IObserver<MouseEvent>>;
}

export interface IMyModalComponentConfig {
  element: HTMLElement;
  inputs: [
    IMatOverlayInput<IMyModalComponentConfig, string>,
  ],
  data: IData;
}

const MyModalComponent = createComponent<IMyModalComponentConfig>({
  name: 'my-modal',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <mat-dialog-basic \${userClose}="$.$userClose">
        <rx-slot name="title">
          My modal
        </rx-slot>

        <rx-slot name="content">
          {{ $.text$ }}
        </rx-slot>

        <rx-slot name="actions">
          <button
            #mat-button
            {click}="$.$onClickCancelButton"
          >
            Cancel
          </button>
          <button #mat-flat-button-primary>
            Go
          </button>
        </rx-slot>
      </mat-dialog-basic>
    `,
    customElements: [
      MatDialogBasicComponent,
    ],
    modifiers: [
      MatButtonModifier,
      MatFlatButtonPrimaryModifier,
    ],
  }),
  inputs: [
    [MAT_OVERLAY_INPUT_NAME],
  ],
  init: (node: VirtualCustomElementNode<IMyModalComponentConfig>): IData => {
    const data$ = getMatOverlayData$$<IMyModalComponentConfig>(node);

    const text$ = data$;

    const $onClickCancelButton = createMatOverlayCloseObserver(node);

    // const $userClose = createMatOverlayCloseObserver(node, (type: IMatDialogBasicComponentCloseType): boolean => {
    //   return type !== 'backdrop';
    // });

    const $userClose = createMatOverlayCloseObserver(node);

    return {
      $userClose,
      text$,
      $onClickCancelButton,
    };
  },
});

// type C<G> = [G] extends [never] ? true : false;
// type A = InferMatOverlayDataFromVirtualCustomElementNodeConfig<IMyModalComponentConfig>;
// type B = IMatOverlayFactoryOpenOptionsFromData<never>;
// type D = C<never>;

const MyModalFactory = new MatDialogFactory(MyModalComponent, {
  animationDuration: 150,
});

/*----------------------------*/

export function matDialogExample(): void {
  const button = document.createElement('button');
  button.innerText = 'open';
  document.body.appendChild(button);

  const open = () => {
    const instance = MyModalFactory.openStatic(
      'Hello world !'.repeat(100),
    );

    instance.state$($log);

    // instance.untilState('opened')
    //   .then(() => {
    //     console.log('opened');
    //
    //     setTimeout(() => {
    //       instance.close()
    //         .then(() => {
    //           console.log('closed');
    //         });
    //     }, 1000);
    //   })
  };

  button.onclick = open;

  open();
}
