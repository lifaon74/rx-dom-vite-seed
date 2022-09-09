import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonComponent } from '../button/mat-button.component';

// @ts-ignore
import style from './mat-icon-button.component.scss?inline';

/**
 * COMPONENT: 'mat-icon-button'
 */

export const MatIconButtonComponent = createMatButtonComponent({
  name: 'mat-icon-button',
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  withButtonStyle: false,
});

