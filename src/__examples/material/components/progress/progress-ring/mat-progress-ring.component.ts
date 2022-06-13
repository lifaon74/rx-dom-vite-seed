import { function$$, IObservable, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  ISetStylePropertyOrStringOrNull,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { MatRippleComponent } from '../../buttons/ripple/mat-ripple.component';

// @ts-ignore
import html from './mat-progress-ring.component.html?raw';
// @ts-ignore
import style from './mat-progress-ring.component.scss?inline';

// https://css-tricks.com/building-progress-ring-quickly/
// https://css-tricks.com/transforms-on-svg-elements/

/**
 * COMPONENT: 'mat-progress-ring'
 */

interface IData {
  readonly strokeWidth$: IObservable<number>;
  readonly strokeDashOffset$: IObservable<ISetStylePropertyOrStringOrNull>;
  readonly strokeDashArray$: IObservable<string>;
  readonly radius$: IObservable<number>;
  readonly diameter$: IObservable<number>;
  readonly innerRadius$: IObservable<number>;
  readonly transform$: IObservable<string>;
}

interface IMatProgressRingComponentConfig {
  inputs: [
    ['progress', number],
    ['radius', number],
    ['stroke', number],
  ];
  data: IData;
}

export const MatProgressRingComponent = createComponent<IMatProgressRingComponentConfig>({
  name: 'mat-progress-ring',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatRippleComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['progress', 0],
    ['radius', 0],
    ['stroke', 0],
  ],
  init: (node: VirtualCustomElementNode<IMatProgressRingComponentConfig>): IData => {
    const progress$ = node.inputs.get$('progress');
    const radius$ = node.inputs.get$('radius');
    const stroke$ = node.inputs.get$('stroke');

    /** SETUP SUBSCRIBE FUNCTIONS **/

    const strokeWidth$ = function$$(
      [stroke$, radius$],
      (stroke: number, radius: number): number => {
        return Math.min(stroke, radius);
      },
    );

    const innerRadius$ = function$$(
      [radius$, strokeWidth$],
      (radius: number, stroke: number): number => {
        return Math.max(0, radius - (stroke / 2));
      },
    );

    const circumference$ = map$$(innerRadius$, (radius: number): number => (radius * 2 * Math.PI));

    const strokeDashOffset$ = function$$(
      [circumference$, progress$],
      (circumference: number, progress: number): ISetStylePropertyOrStringOrNull => {
        return (circumference * (1 - progress)).toString(10);
      },
    );

    const strokeDashArray$ = map$$(circumference$, (circumference: number): string => `${circumference} ${circumference}`);

    const diameter$ = map$$(radius$, (radius: number): number => (radius * 2));

    const transform$ = map$$(radius$, (radius: number): string => `rotate(-90 ${radius} ${radius})`);

    return {
      strokeWidth$,
      strokeDashOffset$,
      strokeDashArray$,
      radius$,
      diameter$,
      innerRadius$,
      transform$,
    };
  },
});

