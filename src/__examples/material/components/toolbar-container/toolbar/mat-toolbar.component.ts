import { createComponent } from '../../../../../component/create/create-component';
import { compileStyleAsComponentStyle } from '../../../../../component/style/compile-style-as-component-style';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../../component/template/compile-reactive-html-as-component-template';

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
