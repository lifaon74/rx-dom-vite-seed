import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';

// @ts-ignore
import html from './mat-dialog-content.component.html?raw';
// @ts-ignore
import style from './mat-dialog-content.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-content'
 *
 * Represents the "content" of a dialog
 */

export interface IMatDialogContentComponentConfig {
  element: HTMLElement;
}

export const MatDialogContentComponent = createComponent<IMatDialogContentComponentConfig>({
  name: 'mat-dialog-content',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
});
