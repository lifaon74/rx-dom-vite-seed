import { interval, IObservable, map$$, merge, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';
import { AppRxInjectSlotExampleBComponent } from './rx-inject-slot-example-b.component';

/** DATA **/

interface IData {
  readonly date$: IObservable<string>;
}

interface IAppRxInjectSlotExampleAComponentConfig {
  data: IData;
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

export const AppRxInjectSlotExampleAComponent = createComponent<IAppRxInjectSlotExampleAComponentConfig>({
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
