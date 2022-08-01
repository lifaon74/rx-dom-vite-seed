import { compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { IMatButtonComponentConfig, MAT_BUTTON_COMPONENT_OPTIONS } from '../../../mat-button.component';

// @ts-ignore
import html from './mat-basic-button-secondary.component.html?raw';
// @ts-ignore
import style from './mat-basic-button-secondary.component.scss?inline';

/**
 * COMPONENT: 'mat-basic-button-secondary'
 */

export interface IMatBasicButtonSecondaryComponentConfig extends IMatButtonComponentConfig {
}

export const MatBasicButtonSecondaryComponent = createComponent<IMatBasicButtonSecondaryComponentConfig>({
  ...MAT_BUTTON_COMPONENT_OPTIONS,
  name: 'mat-basic-button-secondary',
  styles: [
    ...MAT_BUTTON_COMPONENT_OPTIONS.styles!,
    compileStyleAsComponentStyle(style),
  ],
});

