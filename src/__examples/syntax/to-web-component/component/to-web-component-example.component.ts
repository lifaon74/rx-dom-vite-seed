import { IObservable } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent, VirtualCustomElementNode } from '@lirx/dom';

/** DATA **/

interface IData {
  readonly value$: IObservable<string>;
}

interface IAppToWebComponentExampleConfig {
  inputs: [
    ['value', string],
  ];
  data: IData;
}

/** COMPONENT **/

export const AppToWebComponentExampleComponent = createComponent<IAppToWebComponentExampleConfig>({
  name: 'app-to-web-component',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      -{{ $.value$ }}-
  `,
  }),
  inputs: [
    ['value'],
  ],
  init: (node: VirtualCustomElementNode<IAppToWebComponentExampleConfig>): IData => {
    const value$ = node.inputs.get$('value');

    return {
      value$,
    };
  },
});
