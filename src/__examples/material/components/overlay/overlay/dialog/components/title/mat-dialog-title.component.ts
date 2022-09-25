import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';

// @ts-ignore
import html from './mat-dialog-title.component.html?raw';
// @ts-ignore
import style from './mat-dialog-title.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-title'
 *
 * Represents the "title" of a dialog (header area)
 */

export interface IMatDialogTitleComponentConfig {
  element: HTMLElement;
}

export const MatDialogTitleComponent = createComponent<IMatDialogTitleComponentConfig>({
  name: 'mat-dialog-title',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
});
