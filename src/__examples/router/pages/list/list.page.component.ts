import { $log, idle, IObservable, map$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, Component } from '@lirx/dom';
import { AppMenuPageComponent } from '../components/menu/menu.component';
import { RX_NAVIGATION } from '@lirx/router';
import { RXNavigation } from '@lirx/router/src/rx-navigation/rx-navigation.class';

/** COMPONENT **/

interface ITemplateData {
  readonly navigation: RXNavigation;
  readonly canBack$: IObservable<boolean>;
}


export const AppListPageComponent = new Component<HTMLElement, object, ITemplateData>({
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
      <div router-outlet></div>
    `,
    components: [
      AppMenuPageComponent,
    ],
  }),
  templateData: (): ITemplateData => {
    const canBack$ = map$$(idle(), () => RX_NAVIGATION.canBack());
    return {
      navigation: RX_NAVIGATION,
      canBack$,
    };
  },
});
