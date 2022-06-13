import { eq$$, IObservable, let$$, map$$, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent, VirtualCustomElementNode } from '@lirx/dom';
import { getRouteParams, VirtualLinkComponent } from '@lirx/router';
import { AppMenuPageComponent } from '../components/menu/menu.component';

/** COMPONENT **/

interface IData {
  readonly productId$: IObservable<string>;
  readonly productIds$: IObservable<readonly string[]>;
  readonly single: typeof single;
  readonly eq$$: typeof eq$$;
}

interface IAppProductPageComponentConfig {
  element: HTMLElement;
  data: IData;
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
    customElements: [
      AppMenuPageComponent,
      VirtualLinkComponent,
    ],
  }),
  init: (node: VirtualCustomElementNode<IAppProductPageComponentConfig>): IData => {
    const params$ = getRouteParams(node);

    const $productIds$ = let$$(Array.from({ length: 1e1 }, (v: any, i: number) => `${i}`));
    const productIds$ = $productIds$.subscribe;

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
