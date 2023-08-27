import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualComponentNode } from '@lirx/dom';

// @ts-ignore
import html from './left-panel.component.html?raw';
// @ts-ignore
import style from './left-panel.component.scss?inline';

/**
 * COMPONENT: 'app-main'
 */

interface ITemplateData {

}

interface IAppMainComponentConfig {
  element: HTMLElement;
  data: ITemplateData;
}

export const AppMainComponent = createComponent<IAppMainComponentConfig>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualComponentNode<IAppMainComponentConfig>): ITemplateData => {
    return {};
  },
});

