import { IObservable, map$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../component/template/compile-reactive-html-as-component-template';
import { compileStyleAsComponentStyle } from '../../../../component/style/compile-style-as-component-style';
import { createComponent, IComponentStyle, IComponentTemplate } from '../../../../component/create/create-component';
import { createComponentReference } from '../../../../component/create/create-component-reference';
import { ITypedSourcesMapEntry } from '../../../../misc/typed-sources-map/types/typed-sources-map-entry.type';

export interface IAppRecursiveExampleComponentConfig {
  readonly name: string;
  readonly children: readonly IAppRecursiveExampleComponentConfig[];
}

/** SOURCES **/

type ISources = [
  ITypedSourcesMapEntry<'config', IAppRecursiveExampleComponentConfig>,
];

/** DATA **/

interface IData {
  readonly name$: IObservable<string>;
  readonly children$: IObservable<readonly IAppRecursiveExampleComponentConfig[]>;
  readonly notEmpty$: IObservable<boolean>;
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
        [config$]="child"
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

export const AppRecursiveExampleComponent = createComponent<HTMLElement, ISources, IData>({
  name: 'app-recursive-example',
  template,
  styles: [style],
  inputs: [
    ['config'],
  ],
  init: ({ io }): IData => {
    const config$: IObservable<IAppRecursiveExampleComponentConfig> = io.get$('config');

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

