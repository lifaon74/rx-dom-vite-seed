import { distinct$$, fromEventTarget, IObservable, IObserver, let$$, map$$, merge, not$$, reference, throttleTime$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualComponentNode } from '@lirx/dom';
import { IconMenuComponent } from '@lirx/mdi';
import {
  IMatSidenavComponentMode,
  IMatSidenavComponentUserCloseType, MatButtonModifier, MatIconButtonModifier,
  MatSidenavContainerComponent, MatToolbarComponent, MatToolbarContainerComponent,
} from '@lirx/dom-material';

// @ts-ignore
import html from './main.component.html?raw';
// @ts-ignore
import style from './main.component.scss?inline';

/**
 * COMPONENT: 'app-main'
 */

interface ITemplateData {
  readonly sidenavOpened$: IObservable<boolean>;
  readonly sidenavMode$: IObservable<IMatSidenavComponentMode>;
  readonly sidenavHasBackdrop$: IObservable<boolean>;
  readonly menuButtonVisible$: IObservable<boolean>;
  readonly onUserCloseSidenav: IObserver<IMatSidenavComponentUserCloseType>;
  readonly onClickMenuButton: IObserver<MouseEvent>;
}

interface IAppMainComponentConfig {
  element: HTMLElement;
  data: ITemplateData;
}

export const AppMainComponent = createComponent<IAppMainComponentConfig>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      MatSidenavContainerComponent,
      MatToolbarContainerComponent,
      MatToolbarComponent,
      IconMenuComponent,
    ],
    modifiers: [
      MatButtonModifier,
      MatIconButtonModifier,
    ]
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualComponentNode<IAppMainComponentConfig>): ITemplateData => {
    const windowSize$ = throttleTime$$(fromEventTarget(window, 'resize'), 100);

    // TODO use createWindowSizeObservableInitialized ?
    const isLargeWindow = () => (window.innerWidth > 950);
    const isLargeWindow$ = distinct$$(
      merge([
        reference(isLargeWindow),
        map$$(windowSize$, isLargeWindow),
      ]),
    );

    const [
      $sidenavOpened,
      sidenavOpened$,
      getSidenavOpened,
    ] = let$$(false);

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

