import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';

// @ts-ignore
import html from './mat-toolbar.component.html?raw';
// @ts-ignore
import style from './mat-toolbar.component.scss?inline';

/**
 * COMPONENT: 'mat-toolbar'
 */

interface IMatToolbarComponentConfig {
}

export const MatToolbarComponent = createComponent<IMatToolbarComponentConfig>({
  name: 'mat-toolbar',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
});
