import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonComponent } from '@lirx/dom-material';

// @ts-ignore
import html from './mat-input-field-icon-button.component.html?raw';
// @ts-ignore
import style from './mat-input-field-icon-button.component.scss?inline';

/**
 * COMPONENT: 'mat-input-field-icon-button'
 */
export const MatInputFieldIconButtonComponent = createMatButtonComponent({
  name: 'mat-input-field-icon-button',
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  withButtonStyle: false,
});

