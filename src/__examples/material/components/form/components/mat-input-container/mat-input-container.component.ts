import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-input-container.component.scss?inline';

/**
 * COMPONENT: 'mat-input-container'
 */

interface IMatInputContainerComponentConfig {
  element: HTMLElement;
}

export const MatInputContainerComponent = createComponent<IMatInputContainerComponentConfig>({
  name: 'mat-input-container',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [
    compileStyleAsComponentStyle(style),
  ],
});



