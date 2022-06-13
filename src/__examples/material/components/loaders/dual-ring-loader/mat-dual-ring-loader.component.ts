import { compileStyleAsComponentStyle, createComponent } from '@lirx/dom';

// @ts-ignore
import style from './mat-dual-ring-loader.component.scss?inline';

/**
 * COMPONENT: 'mat-dual-ring-loader'
 */

interface IMatDualRingLoaderComponentConfig {
}

export const MatDualRingLoaderComponent = createComponent<IMatDualRingLoaderComponentConfig>({
  name: 'mat-dual-ring-loader',
  styles: [compileStyleAsComponentStyle(style)],
});
