import { createMulticastSource, IObservable, IObserver } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';
import { MatButtonModifier } from '@lirx/dom-material';
import { MatOverlayManager } from '../../manager/mat-overlay-manager';
import { MatDialogBasicComponent } from './built-in/mat-dialog-basic/mat-dialog-basic.component';
import {
  MatDialogBodyComponent
} from './components/mat-dialog-container/components/mat-dialog/components/mat-dialog-body/mat-dialog-body.component';
import {
  MatDialogFooterComponent
} from './components/mat-dialog-container/components/mat-dialog/components/mat-dialog-footer/mat-dialog-footer.component';
import {
  MatDialogCloseComponent
} from './components/mat-dialog-container/components/mat-dialog/components/mat-dialog-header/components/mat-dialog-close/mat-dialog-close.component';
import {
  MatDialogTitleComponent
} from './components/mat-dialog-container/components/mat-dialog/components/mat-dialog-header/components/mat-dialog-title/mat-dialog-title.component';
import {
  MatDialogHeaderComponent
} from './components/mat-dialog-container/components/mat-dialog/components/mat-dialog-header/mat-dialog-header.component';
import { MatDialogComponent } from './components/mat-dialog-container/components/mat-dialog/mat-dialog.component';
import { MatDialogContainerComponent } from './components/mat-dialog-container/mat-dialog-container.component';

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
      <mat-dialog-basic
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
      </mat-dialog-basic>
    `,
    customElements: [
      MatDialogBasicComponent,
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

// const MyModalComponent = createComponent<IMyModalComponentConfig>({
//   name: 'my-modal',
//   template: compileReactiveHTMLAsComponentTemplate({
//     html: `
//       <mat-dialog-container>
//         <mat-dialog>
//           <mat-dialog-header>
//             <mat-dialog-title>
//               Some title
//             </mat-dialog-title>
//             <mat-dialog-close></mat-dialog-close>
//           </mat-dialog-header>
//
//           <mat-dialog-body>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
//           </mat-dialog-body>
//
//           <mat-dialog-footer>
//             <button
//               #mat-button
//               (click)="$.$onClickCancelButton"
//             >
//               Cancel
//             </button>
//             <button #mat-button>
//               Go
//             </button>
//           </mat-dialog-footer>
//       </mat-dialog-container>
//
//     `,
//     customElements: [
//       MatDialogContainerComponent,
//       MatDialogComponent,
//       MatDialogHeaderComponent,
//       MatDialogTitleComponent,
//       MatDialogCloseComponent,
//       MatDialogBodyComponent,
//       MatDialogFooterComponent,
//     ],
//     modifiers: [
//       MatButtonModifier,
//     ],
//   }),
//   init: (node): IData => {
//     const { emit: $onClickCancelButton, subscribe: onClickCancelButton$ } = createMulticastSource<MouseEvent>();
//     const close$ = onClickCancelButton$;
//
//     return {
//       close$,
//       $onClickCancelButton,
//     };
//   },
// });

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
