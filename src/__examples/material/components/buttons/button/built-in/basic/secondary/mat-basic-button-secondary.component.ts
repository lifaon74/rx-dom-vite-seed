import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonComponent } from '../../../mat-button.component';

// @ts-ignore
import style from './mat-basic-button-secondary.component.scss?inline';

/**
 * COMPONENT: 'mat-basic-button-secondary'
 */

export const MatBasicButtonSecondaryComponent = createMatButtonComponent({
  name: 'mat-basic-button-secondary',
  styles: [
    compileStyleAsComponentStyle(style),
  ],
});

