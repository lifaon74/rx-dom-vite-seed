import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-header.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-header'
 *
 * Represents the "header area" of a dialog
 */

export interface IMatDialogHeaderComponentConfig {
  element: HTMLElement;
}

export const MatDialogHeaderComponent = createComponent<IMatDialogHeaderComponentConfig>({
  name: 'mat-dialog-header',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
