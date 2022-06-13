import { compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';
import { VirtualLinkComponent } from '@lirx/router';

/** COMPONENT **/

interface IAppNotFoundPageComponentConfig {
}

export const AppNotFoundPageComponent = createComponent<IAppNotFoundPageComponentConfig>({
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
    customElements: [
      VirtualLinkComponent,
    ],
  }),
});
