import { compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';
import { AppMenuPageComponent } from '../components/menu/menu.component';

/** COMPONENT **/

interface IAppHomePageComponentConfig {
}

export const AppHomePageComponent = createComponent<IAppHomePageComponentConfig>({
  name: 'app-home-page',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <div class="header">
        Home page
      </div>
      <app-menu/>
    `,
    components: [
      AppMenuPageComponent,
    ],
  }),
});
