import { IObservable, map$$ } from '@lirx/core';
import { createComponent } from '../../../../../component/create/create-component';
import { compileStyleAsComponentStyle } from '../../../../../component/style/compile-style-as-component-style';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../../component/template/compile-reactive-html-as-component-template';
import { VirtualCustomElementNode } from '../../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { MatRippleComponent } from '../../buttons/ripple/mat-ripple.component';

// @ts-ignore
import html from './mat-progress-bar.component.html?raw';
// @ts-ignore
import style from './mat-progress-bar.component.scss?inline';

/**
 * COMPONENT: 'mat-progress-bar'
 */

interface IData {
  readonly percent$: IObservable<string>;
  readonly percentText$: IObservable<string>;
}

interface IMatProgressBarComponentConfig {
  inputs: [
    ['progress', number],
  ];
  data: IData;
}

export const MatProgressBarComponent = createComponent<IMatProgressBarComponentConfig>({
  name: 'mat-progress-bar',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatRippleComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['progress', 0],
  ],
  init: (node: VirtualCustomElementNode<IMatProgressBarComponentConfig>): IData => {
    const progress$ = node.inputs.get$('progress');

    const percent$ = map$$(progress$, (progress: number) => `${progress * 100}%`);
    const percentText$ = map$$(progress$, (progress: number) => `${Math.round(progress * 100)}%`);

    return {
      percent$,
      percentText$,
    };
  },
});
