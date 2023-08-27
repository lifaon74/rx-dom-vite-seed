import { $log, IObservable, IObserver } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, Component, input, Input, VirtualComponentNode } from '@lirx/dom';
import {
  IMatDialogComponentCloseType,
  MatButtonModifier,
  MatDialogComponent,
  createMatDialogFactory,
  MatFlatButtonPrimaryModifier,
  IHavingMatOverlayInput,
  createMatOverlayCloseObserver,
  matOverlayInput,
} from '@lirx/dom-material';

/*----------------------------*/

/*----------------------------*/

interface IComponentData extends IHavingMatOverlayInput<HTMLElement, IComponentData> {
  readonly text: Input<string>;
}

interface ITemplateData {
  readonly $close: IObservable<IObserver<IMatDialogComponentCloseType>>;
  readonly text$: IObservable<string>;
  readonly $onClickCancelButton: IObservable<IObserver<MouseEvent>>;
}

const MyModalComponent = new Component<HTMLElement, IComponentData, ITemplateData>({
  name: 'my-modal',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <mat-dialog \${close}="$.$close">
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
      </mat-dialog>
    `,
    components: [
      MatDialogComponent,
    ],
    modifiers: [
      MatButtonModifier,
      MatFlatButtonPrimaryModifier,
    ],
  }),
  componentData: (): IComponentData => {
    return {
      ...matOverlayInput(),
      text: input<string>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IComponentData>): ITemplateData => {
    const text$ = node.data.text.subscribe;

    const $onClickCancelButton = createMatOverlayCloseObserver(node);

    const $close = createMatOverlayCloseObserver(node, (type: IMatDialogComponentCloseType): boolean => {
      return type !== 'backdrop';
    });

    // const $close = createMatOverlayCloseObserver(node);

    return {
      $close,
      text$,
      $onClickCancelButton,
    };
  },
});

// type C<G> = [G] extends [never] ? true : false;
// type A = InferMatOverlayDataFromVirtualComponentNodeConfig<IMyModalComponentConfig>;
// type B = IMatOverlayFactoryOpenOptionsFromData<never>;
// type D = C<never>;

const openMyModal = createMatDialogFactory(MyModalComponent, {
  animationDuration: 150,
});

/*----------------------------*/

export function matDialogExample(): void {
  const button = document.createElement('button');
  button.innerText = 'open';
  document.body.appendChild(button);

  const open = () => {
    const instance = openMyModal();

    instance.node.data.text.emit('Hello world!'.repeat(200));

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
  // open();
}
