import { eq$$, IObservable, let$$, map$$, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, VirtualComponentNode, Component } from '@lirx/dom';
import { VirtualLinkComponent, IHavingRouteParamsInput, routeParamsInput, IHavingRouteDataInput, routeDataInput } from '@lirx/router';
import { AppMenuPageComponent } from '../components/menu/menu.component';

/** COMPONENT **/

interface IAppProductPageComponentData extends IHavingRouteParamsInput, IHavingRouteDataInput {
}

interface ITemplateData {
  readonly productId$: IObservable<string>;
  readonly productIds$: IObservable<readonly string[]>;
  readonly single: typeof single;
  readonly eq$$: typeof eq$$;
}

export const AppProductPageComponent = new Component<HTMLElement, IAppProductPageComponentData, ITemplateData>({
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
             $[to]="'./product/' + productId"
             $[replaceState]="true"
           >
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
  componentData: (): IAppProductPageComponentData => {
    return {
      ...routeParamsInput(),
      ...routeDataInput(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IAppProductPageComponentData>): ITemplateData => {
    const params$ = node.input$('ROUTE_PARAMS');
    const data$ = node.input$('ROUTE_DATA');

    const [, productIds$] = let$$(Array.from({ length: 1e1 }, (v: any, i: number) => `${i}`));

    // params$((params: IRouteParams) => {
    //   console.log('params', params);
    // });
    //
    // data$((data: any) => {
    //   console.log('data', data);
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
