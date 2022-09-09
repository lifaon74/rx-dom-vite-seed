import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonComponent } from '../../../mat-button.component';

// @ts-ignore
import style from './mat-flat-button-primary.component.scss?inline';

/**
 * COMPONENT: 'mat-flat-button-primary'
 */

export const MatFlatButtonPrimaryComponent = createMatButtonComponent({
  name: 'mat-flat-button-primary',
  styles: [
    compileStyleAsComponentStyle(style),
  ],
});

