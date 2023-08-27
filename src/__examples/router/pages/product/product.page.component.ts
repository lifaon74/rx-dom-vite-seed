import { eq$$, IObservable, let$$, map$$, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent, VirtualComponentNode } from '@lirx/dom';
import { getRouteParams, VirtualLinkComponent } from '@lirx/router';
import { AppMenuPageComponent } from '../components/menu/menu.component';

/** COMPONENT **/

interface ITemplateData {
  readonly productId$: IObservable<string>;
  readonly productIds$: IObservable<readonly string[]>;
  readonly single: typeof single;
  readonly eq$$: typeof eq$$;
}

interface IAppProductPageComponentConfig {
  element: HTMLElement;
  data: ITemplateData;
}

export const AppProductPageComponent = createComponent<IAppProductPageComponentConfig>({
  name: 'app-product-page',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <div class="header">
        Product page
      </div>
      <app-menu></app-menu>

      <div class="current-product-id-container">
        Current product id: {{ $.productId$ }}
      </div>

      <ul>
        <li *for="let productId of $.productIds$">
           <v-link
             [href]="'./product/' + productId"
             $[replace-state]="true"
           >
<!--           $[replaceState]="true"-->
            Product: {{ $.single(productId) }}
            <rx-container *if="$.eq$$($.single(productId), $.productId$)">
              -> Selected
            </rx-container>
           </v-link>
        </li>
      </ul>
    `,
    components: [
      AppMenuPageComponent,
      VirtualLinkComponent,
    ],
  }),
  init: (node: VirtualComponentNode<IAppProductPageComponentConfig>): ITemplateData => {
    const params$ = getRouteParams(node);

    const [productIds, productIds$] = let$$(Array.from({ length: 1e1 }, (v: any, i: number) => `${i}`));

    // params$((params: IRouteParams) => {
    //   console.log('params', params);
    // });

    const productId$ = map$$(params$, params => params.productId);

    return {
      productId$,
      productIds$,
      single,
      eq$$,
    };
  },
});
