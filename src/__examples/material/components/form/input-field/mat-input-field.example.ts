import { bootstrap, compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';
import { MatIconButtonComponent } from '@lirx/dom-material';
import { IconMagnifyComponent } from '@lirx/mdi';
import { MatInputFieldIconButtonComponent } from './components/icon-button/mat-input-field-icon-button.component';
import { MatInputFieldComponent } from './mat-input-field.component';

interface IMatInputFieldComponentConfig {
  element: HTMLElement;
}

const MatInputFieldExampleComponent = createComponent<IMatInputFieldComponentConfig>({
  name: 'mat-input-field-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <rx-script>
        const disabled = true;
      </rx-script>
      <mat-input-field>
        <rx-slot name="before">
          <mat-input-field-icon-button [disabled]="disabled">
            <icon-magnify></icon-magnify>
          </mat-input-field-icon-button>
        </rx-slot>
        <rx-slot name="input">
          <input [disabled]="disabled"/>
        </rx-slot>
        <rx-slot name="after">
          <mat-input-field-icon-button [disabled]="disabled">
            <icon-magnify></icon-magnify>
            <icon-magnify></icon-magnify>
          </mat-input-field-icon-button>
        </rx-slot>
      </mat-input-field>
    `,
    customElements: [
      MatInputFieldComponent,
      MatInputFieldIconButtonComponent,
      IconMagnifyComponent,
    ],
  }),
});

/*----------*/

export function matInputFieldExample(): void {
  bootstrap(MatInputFieldExampleComponent);
}
