import { $log, idle, IObservable, map$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';
import { INavigation, NAVIGATION } from '@lirx/router';
import { AppMenuPageComponent } from '../components/menu/menu.component';

/** COMPONENT **/

interface IData {
  readonly navigation: INavigation;
  readonly canBack$: IObservable<boolean>;
}

interface IAppListPageComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const AppListPageComponent = createComponent<IAppListPageComponentConfig>({
  name: 'app-list-page',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <div class="header">
        List page
      </div>
      
      <div
        *if="$.canBack$"
        class="back"
        (click)="$.navigation.back"
      >
        Back
      </div>
      
      <app-menu></app-menu>
      <div rx-router-outlet></div>
    `,
    customElements: [
      AppMenuPageComponent,
    ],
  }),
  init: (): IData => {
    const canBack$ = map$$(idle(), () => NAVIGATION.canBack());
    NAVIGATION.change$($log);
    return {
      navigation: NAVIGATION,
      canBack$,
    };
  },
});
