import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { MatIconButtonModifier } from '@lirx/dom-material';
import { IconCloseComponent } from '@lirx/mdi';

// @ts-ignore
import html from './mat-dialog-close.component.html?raw';

// @ts-ignore
import style from './mat-dialog-close.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-close'
 *
 * Represents the close icon of a dialog
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
    ],
    modifiers: [
      MatIconButtonModifier,
    ]
  }),
  styles: [compileStyleAsComponentStyle(style)],
});
