import {
  $log,
  createUnicastReplayLastSource,
  fromAnimationFrame,
  IObservable,
  IObserver,
  IUnsubscribe,
  map$$,
  switchMap$$,
  single,
  timeout,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { createRXRouter, IRXRouter, IRXRouterNavigationState, IRXRouterOutletElement, NAVIGATION } from '@lirx/router';
import { MatProgressBarComponent } from '../../material/components/progress/progress-bar/mat-progress-bar.component';
import { NODE_REFERENCE_MODIFIER } from '../../material/modifiers/node-reference.modifier';
import { APP_ROUTES } from './routes';
import { APP_ROUTES_ASYNC } from './routes-async';

function createFakeProgressObservable(
  timeConstant: number,
): IObservable<number> {
  return (emit: IObserver<number>): IUnsubscribe => {
    const startTimestamp: number = Date.now();

    return fromAnimationFrame()(() => {
      const elapsedTime: number = Date.now() - startTimestamp;
      const ratio: number = elapsedTime / timeConstant;
      // const progress: number = 1 - Math.exp(-ratio);
      const progress: number = 1 - (1 / (ratio + 1));
      emit(progress);
    });
  };
}

/** COMPONENT **/

interface IData {
  readonly $routerOutletElement: IObserver<IRXRouterOutletElement>;
  readonly progress$: IObservable<number>;
}

interface IAppMainComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const AppMainComponent = createComponent<IAppMainComponentConfig>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <mat-progress-bar
        class="loader"
        $[progress]="$.progress$"
      ></mat-progress-bar>

      <div
        rx-router-outlet
        #ref="$.$routerOutletElement"
      ></div>
    `,
    customElements: [
      MatProgressBarComponent,
    ],
    modifiers: [
      NODE_REFERENCE_MODIFIER,
    ],
  }),
  styles: [compileStyleAsComponentStyle(`
    :host {
      display: block;
      position: relative;
    }

    :host > .loader {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      border: 0;
      border-radius: 0;
      color: transparent;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    }

    :host:not(.loading) > .loader {
      display: none;
    }
  `)],
  init: (node: VirtualCustomElementNode<IAppMainComponentConfig>): IData => {
    // const routes = APP_ROUTES_ASYNC;
    const routes = APP_ROUTES;

    const { emit: $routerOutletElement, subscribe: routerOutletElement$ } = createUnicastReplayLastSource<IRXRouterOutletElement>();

    let router: IRXRouter;
    let unsubscribeLoading: IUnsubscribe;

    const progress$ = switchMap$$(routerOutletElement$, (routerOutletElement: IRXRouterOutletElement): IObservable<number> => {
      if (router !== void 0) {
        router.destroy();
      }

      router = createRXRouter({
        routes,
        routerOutletElement,
      });

      router.error$($log);

      const loading$ = switchMap$$(router.state$, (state: IRXRouterNavigationState) => {
        return (state === 'updating')
          ? map$$(timeout(200), () => true)
          : single(false);
      });

      const progress$ = switchMap$$(loading$, (loading: boolean): IObservable<number> => {
        return loading
          ? createFakeProgressObservable(2000)
          : single(0);
      });

      if (unsubscribeLoading !== void 0) {
        unsubscribeLoading();
      }

      unsubscribeLoading = node.setReactiveClass('loading', loading$);

      return progress$;
    });

    // progress$($log);
    return {
      $routerOutletElement,
      progress$,
    };
  },
});



