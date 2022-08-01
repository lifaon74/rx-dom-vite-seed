import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';

// @ts-ignore
import html from './left-panel.component.html?raw';
// @ts-ignore
import style from './left-panel.component.scss?inline';

/**
 * COMPONENT: 'app-main'
 */

interface IData {

}

interface IAppMainComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const AppMainComponent = createComponent<IAppMainComponentConfig>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualCustomElementNode<IAppMainComponentConfig>): IData => {
    return {};
  },
});

