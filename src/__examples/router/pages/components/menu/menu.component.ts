import { compileReactiveHTMLAsComponentTemplate, Component } from '@lirx/dom';
import { VirtualLinkComponent } from '@lirx/router';


/** COMPONENT **/

export const AppMenuPageComponent = new Component({
  name: 'app-menu',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <ul>
        <li>
           <v-link $[to]="'./home'">Home</v-link>
<!--           <a $link="['./home']">Home</v-link>-->
        </li>
        <li>
           <v-link $[to]="'./product/0'">Products</v-link>
        </li>
        <li>
<!--           <v-link $[to]="'./list">List</v-link>-->
           <v-link $[to]="'./list'">List</v-link>
        </li>
        <li>
           <v-link $[to]="'./list/sub'">Sub-list</v-link>
        </li>
        <li>
           <v-link $[to]="'./list/async'">List async</v-link>
        </li>
        <li>
           <v-link $[to]="'./forbidden'">Forbidden</v-link>
        </li>
<!--        <li>-->
<!--           <v-link $[to]="'/list" target="_blank">List page (new tab)</v-link>-->
<!--        </li>-->
<!--        <li>-->
<!--           <v-link $[to]="'mailto:bob@alice.com">Email</v-link>-->
<!--        </li>-->
      </ul>
    `,
    components: [
      VirtualLinkComponent,
    ],
  }),
});
