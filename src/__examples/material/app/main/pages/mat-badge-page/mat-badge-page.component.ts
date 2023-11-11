import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, VirtualComponentNode, Component } from '@lirx/dom';

// @ts-ignore
import html from './mat-badge-page.component.html?raw';
// @ts-ignore
import style from './mat-badge-page.component.scss?inline';

/**
 * COMPONENT: 'mat-badge-page'
 */

interface ITemplateData {

}

export const MatBadgePageComponent = new Component<HTMLElement, object, ITemplateData>({
  name: 'mat-badge-page',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (node: VirtualComponentNode<HTMLElement, object>): ITemplateData => {

    return {};
  },
});

