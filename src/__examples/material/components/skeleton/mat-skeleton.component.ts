import { compileStyleAsComponentStyle, createComponent } from '@lirx/dom';

// @ts-ignore
import style from './mat-skeleton.component.scss?inline';

/**
 * COMPONENT: 'mat-skeleton'
 */

interface IMatSkeletonComponentConfig {
  element: HTMLElement;
}

export const MatSkeletonComponent = createComponent<IMatSkeletonComponentConfig>({
  name: 'mat-skeleton',
  styles: [compileStyleAsComponentStyle(style)],
});
