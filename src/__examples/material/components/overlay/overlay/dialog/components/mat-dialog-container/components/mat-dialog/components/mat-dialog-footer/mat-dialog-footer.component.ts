import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-footer.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-footer'
 *
 * Represents the "footer area" of a dialog
 */

export interface IMatDialogFooterComponentConfig {
  element: HTMLElement;
}

export const MatDialogFooterComponent = createComponent<IMatDialogFooterComponentConfig>({
  name: 'mat-dialog-footer',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
