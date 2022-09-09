import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonComponent } from '../../../mat-button.component';

// @ts-ignore
import style from './mat-flat-button-secondary.component.scss?inline';

/**
 * COMPONENT: 'mat-flat-button-secondary'
 */

export const MatFlatButtonSecondaryComponent = createMatButtonComponent({
  name: 'mat-flat-button-secondary',
  styles: [
    compileStyleAsComponentStyle(style),
  ],
});

