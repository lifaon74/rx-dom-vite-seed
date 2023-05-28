import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-body.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-body'
 *
 * Represents the "body" of a dialog
 */

export interface IMatDialogBodyComponentConfig {
  element: HTMLElement;
}

export const MatDialogBodyComponent = createComponent<IMatDialogBodyComponentConfig>({
  name: 'mat-dialog-body',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
