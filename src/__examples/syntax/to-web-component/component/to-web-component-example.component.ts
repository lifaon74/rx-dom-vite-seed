import { IObservable } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, Component, VirtualComponentNode, Input, input } from '@lirx/dom';

/** DATA **/

interface IAppToWebComponentExampleData {
  readonly value: Input<string>;
}

interface ITemplateData {
  readonly value$: IObservable<string>;
}



/** COMPONENT **/

export const AppToWebComponentExampleComponent = new Component<HTMLElement, IAppToWebComponentExampleData, ITemplateData>({
  name: 'app-to-web-component',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      -{{ $.value$ }}-
  `,
  }),
  componentData: (): IAppToWebComponentExampleData => {
    return {
      value: input<string>(),
    }
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IAppToWebComponentExampleData>): ITemplateData => {
    const value$ = node.input$('value');

    return {
      value$,
    };
  },
});
