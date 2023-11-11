import { compileReactiveHTMLAsComponentTemplate, Component } from '@lirx/dom';
import { AppMenuPageComponent } from '../components/menu/menu.component';

/** COMPONENT **/


export const AppHomePageComponent = new Component({
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
