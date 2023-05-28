import { createMulticastSource, IObservable, IObserver } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';
import { MatButtonModifier } from '@lirx/dom-material';
import { MatOverlayManager } from '../../manager/mat-overlay-manager';
import { MatDialogClassicComponent } from './built-in/classic/mat-dialog-classic.component';

/*----------------------------*/

interface IData {
  readonly close$: IObservable<any>;
  readonly $onClickCancelButton: IObserver<MouseEvent>;
}

export interface IMyModalComponentConfig {
  element: HTMLElement;
  data: IData;
}

const MyModalComponent = createComponent<IMyModalComponentConfig>({
  name: 'my-modal',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
    <mat-dialog-classic
      $[close]="$.close$"
    >
      <rx-slot name="title">
        My modal
      </rx-slot>
      
      <rx-slot name="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
      </rx-slot>
      
      <rx-slot name="actions">
        <button
          #mat-button
          (click)="$.$onClickCancelButton"
        >
          Cancel
        </button>
        <button #mat-button>
          Go
        </button>
      </rx-slot>
    </mat-dialog-classic>
  `,
    customElements: [
      MatDialogClassicComponent,
    ],
    modifiers: [
      MatButtonModifier,
    ],
  }),
  init: (node): IData => {
    const { emit: $onClickCancelButton, subscribe: onClickCancelButton$ } = createMulticastSource<MouseEvent>();
    const close$ = onClickCancelButton$;

    return {
      close$,
      $onClickCancelButton,
    };
  },
});

/*----------------------------*/

export function matDialogExample(): void {
  const manager = MatOverlayManager.create();

  const button = document.createElement('button');
  button.innerText = 'open';
  document.body.appendChild(button);

  button.onclick = () => {
    manager.open(MyModalComponent);
  };

  manager.open(MyModalComponent);

  // const modal = manager.open(MyModalComponent);
  // window.onclick = () => modal.detach();
}
