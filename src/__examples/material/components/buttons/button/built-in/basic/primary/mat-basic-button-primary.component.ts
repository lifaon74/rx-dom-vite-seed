import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonComponent } from '../../../mat-button.component';

// @ts-ignore
import style from './mat-basic-button-primary.component.scss?inline';

/**
 * COMPONENT: 'mat-basic-button-primary'
 */

export const MatBasicButtonPrimaryComponent = createMatButtonComponent({
  name: 'mat-basic-button-primary',
  styles: [
    compileStyleAsComponentStyle(style),
  ],
});

