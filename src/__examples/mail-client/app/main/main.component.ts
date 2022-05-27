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
} from '@lirx/core';
import { createComponent } from '../../../../component/create/create-component';
import { compileStyleAsComponentStyle } from '../../../../component/style/compile-style-as-component-style';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../component/template/compile-reactive-html-as-component-template';
import { VirtualCustomElementNode } from '../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { MatButtonComponent } from '../../../material/components/buttons/button/mat-button.component';
import { MatRippleComponent } from '../../../material/components/buttons/ripple/mat-ripple.component';
import {
  IMatSidenavComponentMode,
  IMatSidenavComponentUserCloseType,
  MatSidenavContainerComponent,
} from '../../../material/components/sidenav-container/mat-sidenav-container.component';
import { MatToolbarContainerComponent } from '../../../material/components/toolbar-container/mat-toolbar-container.component';
import { MatToolbarComponent } from '../../../material/components/toolbar-container/toolbar/mat-toolbar.component';

// @ts-ignore
import html from './main.component.html?raw';
// @ts-ignore
import style from './main.component.scss?inline';

/**
 * COMPONENT: 'app-main'
 */

interface IData {
  readonly sidenavOpened$: IObservable<boolean>;
  readonly sidenavMode$: IObservable<IMatSidenavComponentMode>;
  readonly sidenavHasBackdrop$: IObservable<boolean>;
  readonly menuButtonVisible$: IObservable<boolean>;
  readonly onUserCloseSidenav: IObserver<IMatSidenavComponentUserCloseType>;
  readonly onClickMenuButton: IObserver<MouseEvent>;
}

interface IAppMainComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const AppMainComponent = createComponent<IAppMainComponentConfig>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatSidenavContainerComponent,
      MatToolbarContainerComponent,
      MatToolbarComponent,
      // MatIconMenuComponent,
      MatButtonComponent,
      MatRippleComponent,
      // MatIconsDemoComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualCustomElementNode<IAppMainComponentConfig>): IData => {
    const windowSize$ = throttleTime$$(fromEventTarget(window, 'resize'), 100);

    // TODO use createWindowSizeObservableInitialized ?
    const isLargeWindow = () => (window.innerWidth > 950);
    const isLargeWindow$ = distinct$$(
      merge([
        reference(isLargeWindow),
        map$$(windowSize$, isLargeWindow),
      ]),
    );

    const {
      emit: $sidenavOpened,
      subscribe: sidenavOpened$,
      getValue: getSidenavOpened,
    } = let$$(false);

    const onUserCloseSidenav = (): void => {
      $sidenavOpened(false);
    };

    const onClickMenuButton = (): void => {
      $sidenavOpened(!getSidenavOpened());
    };

    node.onConnected$(isLargeWindow$)($sidenavOpened);

    const sidenavMode$ = map$$(isLargeWindow$, (isLargeWindow: boolean): IMatSidenavComponentMode => {
      return isLargeWindow
        ? 'push'
        : 'over';
    });

    const sidenavHasBackdrop$ = not$$(isLargeWindow$);

    const menuButtonVisible$ = not$$(isLargeWindow$);

    return {
      sidenavOpened$,
      sidenavMode$,
      sidenavHasBackdrop$,
      menuButtonVisible$,

      onUserCloseSidenav,
      onClickMenuButton,
    };
  },
});

