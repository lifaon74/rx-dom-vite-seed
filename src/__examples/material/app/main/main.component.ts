import {
  distinct$$,
  fromEventTarget,
  IObservable,
  IObserver,
  let$$,
  map$$,
  merge,
  not$$,
  reference,
  throttleTime$$,
  $log, shareRL$$$, shareRL$$,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Component, VirtualDOMNode, virtualDOMNodeQuerySelectorOrThrow, VirtualRootNode, IVirtualDOMNodeOrNull,
} from '@lirx/dom';
import { IconMenuComponent } from '@lirx/mdi';
import {
  IMatSidenavComponentMode,
  IMatSidenavComponentUserCloseType,
  MatButtonModifier,
  MatIconButtonModifier,
  MatSidenavContainerComponent,
  MatToolbarComponent,
  MatToolbarContainerComponent,
  MatMenuComponent,
  MatMenuItemModifier,
  MatNavListComponent, MatNavListItemModifier, NodeReferenceModifier,
} from '@lirx/dom-material';
import { IUnsubscribe } from '@lirx/unsubscribe';
import {
  VirtualLinkComponent,
  RouteList,
  ILiRxRouteListLike,
  locateRouterOutletElement,
  createLiRxRouter,
  LiRxRouter,
  RX_NAVIGATION,
} from '@lirx/router';
import { MatClassicPageLayoutComponent } from './mat-classic-page-layout/mat-classic-page-layout.component';
import { Abortable, AsyncTask } from '@lirx/async-task';

// @ts-ignore
import html from './main.component.html?raw';
// @ts-ignore
import style from './main.component.scss?inline';
import { MatBadgePageComponent } from './pages/mat-badge-page/mat-badge-page.component';
import { MatButtonPageComponent } from './pages/mat-button-page/mat-button-page.component';
import { INavigationNotification } from '@lirx/router/src/rx-navigation/rx-navigation.class';

/** ROUTES **/



const APP_ROUTES: ILiRxRouteListLike = [
  {
    path: 'components',
    children: [
      {
        path: 'badge',
        component: MatBadgePageComponent,
      },
      {
        path: 'button',
        component: MatButtonPageComponent,
      },
    ],
  },
];

/**
 * COMPONENT: 'app-main'
 */

interface ITemplateData {
  readonly $routerOutlet: IObserver<VirtualDOMNode>;
  readonly isButtonSelected$$: (name: string) => IObservable<boolean>;
}

export const AppMainComponent = new Component<HTMLElement, object, ITemplateData>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      MatClassicPageLayoutComponent,
      IconMenuComponent,
      MatNavListComponent,
      VirtualLinkComponent,
    ],
    modifiers: [
      MatButtonModifier,
      MatIconButtonModifier,
      MatNavListItemModifier,
      NodeReferenceModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (node: VirtualComponentNode<HTMLElement, object>): ITemplateData => {
    const [$routerOutlet, routerOutlet$] = let$$<VirtualDOMNode>();
    let router: LiRxRouter;

    routerOutlet$((routerOutletElement: VirtualDOMNode): void => {
      if (router !== void 0) {
        router.destroy();
      }

      router = createLiRxRouter({
        routes: APP_ROUTES,
        routerOutletElement,
      });

      router.error$($log);
    });

    const currentUrl$ = shareRL$$(
      merge([
        reference(() => new URL(window.location.href)),
        map$$(RX_NAVIGATION.change$, (notification: INavigationNotification): URL => {
          return notification.value.url;
        }),
      ]),
    );

    const isButtonSelected$$ = (
      name: string,
    ): IObservable<boolean> => {
      return map$$(currentUrl$, (url: URL): boolean => {
        switch (name) {
          case 'mat-badge-page':
            return url.pathname === '/components/badge';
          case 'mat-button-page':
            return url.pathname === '/components/button';
          default:
            return false;
        }
      });
    };

    return {
      $routerOutlet,
      isButtonSelected$$,
    };
  },
});

