import { compileReactiveHTMLAsComponentTemplate, Component } from '@lirx/dom';
import { VirtualLinkComponent } from '@lirx/router';

/** COMPONENT **/


export const AppNotFoundPageComponent = new Component({
  name: 'app-not-found-page',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <div class="header">
         404 not found
      </div>
      <v-link href="./home">
        Home
      </v-link>
    `,
    components: [
      VirtualLinkComponent,
    ],
  }),
});
