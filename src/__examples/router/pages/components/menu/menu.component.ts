import { compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';
import { VirtualLinkComponent } from '@lirx/router';


/** COMPONENT **/

interface IAppMenuPageComponentConfig {
}

export const AppMenuPageComponent = createComponent<IAppMenuPageComponentConfig>({
  name: 'app-menu',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <ul>
        <li>
           <v-link href="./home">Home</v-link>
<!--           <a $link="['./home']">Home</v-link>-->
        </li>
        <li>
           <v-link href="./product/0">Products</v-link>
        </li>
        <li>
<!--           <v-link href="./list">List</v-link>-->
           <v-link href="./list">List</v-link>
        </li>
        <li>
           <v-link href="./list/sub">Sub-list</v-link>
        </li>
        <li>
           <v-link href="./list/async">List async</v-link>
        </li>
        <li>
           <v-link href="./forbidden">Forbidden</v-link>
        </li>
<!--        <li>-->
<!--           <v-link href="/list" target="_blank">List page (new tab)</v-link>-->
<!--        </li>-->
<!--        <li>-->
<!--           <v-link href="mailto:bob@alice.com">Email</v-link>-->
<!--        </li>-->
      </ul>
    `,
    customElements: [
      VirtualLinkComponent,
    ],
  }),
});
