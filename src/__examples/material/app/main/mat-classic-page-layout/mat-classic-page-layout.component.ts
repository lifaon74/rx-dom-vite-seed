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
  switchMap$$, toSignal,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Component, Input, input,
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
  MatNavListComponent, MatNavListItemModifier,
} from '@lirx/dom-material';
import { IUnsubscribe } from '@lirx/unsubscribe';
import { VirtualLinkComponent } from '@lirx/router';

// @ts-ignore
import html from './mat-classic-page-layout.component.html?raw';
// @ts-ignore
import style from './mat-classic-page-layout.component.scss?inline';

/**
 * COMPONENT: 'mat-classic-page-layout'
 */

export interface IMatClassicPageLayoutComponentData {
  readonly breakpoint: Input<number>;
}

interface ITemplateData {
  readonly sidenavOpened$: IObservable<boolean>;
  readonly sidenavMode$: IObservable<IMatSidenavComponentMode>;
  readonly sidenavHasBackdrop$: IObservable<boolean>;
  readonly menuButtonVisible$: IObservable<boolean>;
  readonly onUserCloseSidenav: IObserver<IMatSidenavComponentUserCloseType>;
  readonly onClickMenuButton: IObserver<MouseEvent>;
}

export const MatClassicPageLayoutComponent = new Component<HTMLElement, IMatClassicPageLayoutComponentData, ITemplateData>({
  name: 'mat-classic-page-layout',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      MatSidenavContainerComponent,
      MatToolbarContainerComponent,
      MatToolbarComponent,
      IconMenuComponent,
    ],
    modifiers: [
      MatIconButtonModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatClassicPageLayoutComponentData => {
    return {
      breakpoint: input<number>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatClassicPageLayoutComponentData>): ITemplateData => {
    const breakpoint$ = node.input$('breakpoint');

    const windowSize$ = throttleTime$$(fromEventTarget(window, 'resize'), 100);

    const isLargeWindow$ = switchMap$$(breakpoint$, (breakpoint: number): IObservable<boolean> => {
      const isLargeWindow = () => (window.innerWidth > breakpoint);
      return distinct$$(
        merge([
          reference(isLargeWindow),
          map$$(windowSize$, isLargeWindow),
        ]),
      );
    });

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

    node.onConnected((): IUnsubscribe => {
      return isLargeWindow$($sidenavOpened);
    });

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

