import { IObservable, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle,
  createComponent,
  createComponentReference,
  IComponentStyle,
  IComponentTemplate,
} from '@lirx/dom';

/** TYPES **/

export interface IAppRecursiveExampleComponentInputConfig {
  readonly name: string;
  readonly children: readonly IAppRecursiveExampleComponentInputConfig[];
}

interface IData {
  readonly name$: IObservable<string>;
  readonly children$: IObservable<readonly IAppRecursiveExampleComponentInputConfig[]>;
  readonly notEmpty$: IObservable<boolean>;
}

interface IAppRecursiveExampleComponentConfig {
  data: IData;
  inputs: [
    ['config', IAppRecursiveExampleComponentInputConfig],
  ];
}

/** TEMPLATE **/

const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <div class="name">
      {{ $.name$ }}
    </div>
    <div
      class="children"
      *if="$.notEmpty$"
    >
      <app-recursive-example
        *for="let child of $.children$"
        $[config]="child"
      ></app-recursive-example>
    </div>
  `,
  customElements: [
    createComponentReference('app-recursive-example', () => AppRecursiveExampleComponent),
  ],
});

/** STYLE **/

const style: IComponentStyle = compileStyleAsComponentStyle(`
  :host {
    display: block;
  }
  
  :host > .children {
    padding-left: 15px;
    padding-bottom: 10px;
  }
`);

/** COMPONENT **/

export const AppRecursiveExampleComponent = createComponent<IAppRecursiveExampleComponentConfig>({
  name: 'app-recursive-example',
  template,
  styles: [style],
  inputs: [
    ['config'],
  ],
  init: (node): IData => {
    const config$: IObservable<IAppRecursiveExampleComponentInputConfig> = node.inputs.get$('config');

    const name$ = map$$(config$, _ => _.name);
    const children$ = map$$(config$, _ => _.children);
    const notEmpty$ = map$$(children$, _ => _.length > 0);

    return {
      name$,
      children$,
      notEmpty$,
    };
  },
});

