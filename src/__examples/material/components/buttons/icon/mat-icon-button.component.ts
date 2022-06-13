import { compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { IMatButtonComponentConfig, MAT_BUTTON_COMPONENT_OPTIONS } from '../button/mat-button.component';

// @ts-ignore
import style from './mat-icon-button.component.scss?inline';

/**
 * COMPONENT: 'mat-icon-button'
 */


export const MatIconButtonComponent = createComponent<IMatButtonComponentConfig>({
  ...MAT_BUTTON_COMPONENT_OPTIONS,
  name: 'mat-icon-button',
  styles: [
    compileStyleAsComponentStyle(style),
  ],
});
