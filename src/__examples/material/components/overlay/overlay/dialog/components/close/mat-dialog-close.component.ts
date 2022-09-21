import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { IconCloseComponent } from '@lirx/mdi';
import { MatIconButtonComponent } from '@lirx/dom-material';

// @ts-ignore
import html from './mat-dialog-close.component.html?raw';

// @ts-ignore
import style from './mat-dialog-close.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-close'
 */

export interface IMatDialogCloseComponentConfig {
  element: HTMLElement;
}

export const MatDialogCloseComponent = createComponent<IMatDialogCloseComponentConfig>({
  name: 'mat-dialog-close',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      IconCloseComponent,
      MatIconButtonComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
});
