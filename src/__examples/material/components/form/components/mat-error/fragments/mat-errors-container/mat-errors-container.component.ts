import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE, VirtualComponentNode } from '@lirx/dom';

// @ts-ignore
import style from './mat-errors-container.component.scss?inline';

/**
 * COMPONENT: 'mat-errors-container'
 */

interface IMatErrorsContainerComponentConfig {
  element: HTMLElement;
}

export const MatErrorsContainerComponent = createComponent<IMatErrorsContainerComponentConfig>({
  name: 'mat-errors-container',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [
    compileStyleAsComponentStyle(style),
  ],
  init: (node: VirtualComponentNode<IMatErrorsContainerComponentConfig>): void => {
  },
});



