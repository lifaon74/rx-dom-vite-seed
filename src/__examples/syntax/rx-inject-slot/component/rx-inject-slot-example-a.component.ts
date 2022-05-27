import { interval, IObservable, map$$, merge, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../component/template/compile-reactive-html-as-component-template';
import { createComponent, IComponentTemplate } from '../../../../component/create/create-component';
import { AppRxInjectSlotExampleBComponent } from './rx-inject-slot-example-b.component';

/** SOURCES **/

type ISources = [];

/** DATA **/

interface IData {
  readonly date$: IObservable<string>;
}

/** TEMPLATE **/

const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <app-rx-inject-slot-example-b>
      {{ $.date$ }}
    </app-rx-inject-slot-example-b>
  `,
  customElements: [
    AppRxInjectSlotExampleBComponent,
  ],
});

// const template: ICreateComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <app-rx-inject-slot-example-b>
//       <rx-slot name="main">
//         {{ $.date$ }}
//       </rx-slot>
//     </app-rx-inject-slot-example-b>
//   `,
//   customElements: [
//     AppRxInjectSlotExampleBComponent,
//   ],
// });

/** COMPONENT **/

export const AppRxInjectSlotExampleAComponent = createComponent<HTMLElement, ISources, IData>({
  name: 'app-rx-inject-slot-example-a',
  template,
  inputs: [],
  init: (): IData => {
    const date$ = map$$(merge([interval(1000), single(void 0)]), () => new Date().toString());

    return {
      date$,
    };
  },
});
