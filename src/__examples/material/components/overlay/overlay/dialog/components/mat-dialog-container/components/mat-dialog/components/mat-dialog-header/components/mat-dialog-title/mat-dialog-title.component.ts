import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-title.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-title'
 *
 * Represents the "title" of a dialog (in the title area)
 */

export interface IMatDialogTitleComponentConfig {
  element: HTMLElement;
}

export const MatDialogTitleComponent = createComponent<IMatDialogTitleComponentConfig>({
  name: 'mat-dialog-title',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
