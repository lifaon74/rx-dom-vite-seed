import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';

// @ts-ignore
import html from './mat-dialog-actions.component.html?raw';
// @ts-ignore
import style from './mat-dialog-actions.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-actions'
 */

export interface IMatDialogActionsComponentConfig {
  element: HTMLElement;
}

export const MatDialogActionsComponent = createComponent<IMatDialogActionsComponentConfig>({
  name: 'mat-dialog-actions',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
});
