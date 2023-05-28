import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

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
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
