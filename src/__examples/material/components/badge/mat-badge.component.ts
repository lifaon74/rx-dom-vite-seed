import { IObservable, map$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';

// @ts-ignore
import html from './mat-badge.component.html?raw';
// @ts-ignore
import style from './mat-badge.component.scss?inline';

/**
 * COMPONENT: 'mat-badge'
 */

interface IData {
  readonly content$: IObservable<string>;
}

interface IMatBadgeComponentConfig {
  inputs: [
    ['content', string],
  ];
  data: IData;
}

export const MatBadgeComponent = createComponent<IMatBadgeComponentConfig>({
  name: 'mat-badge',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['content'],
  ],
  init: (node: VirtualCustomElementNode<IMatBadgeComponentConfig>): IData => {
    const content$ = node.inputs.get$('content');

    return {
      content$,
    };
  },
});
