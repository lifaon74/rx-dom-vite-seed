import { function$$, IObservable, IObserver } from '@lirx/core';
import { createComponent } from '../../../../component/create/create-component';
import { compileStyleAsComponentStyle } from '../../../../component/style/compile-style-as-component-style';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../component/template/compile-reactive-html-as-component-template';
import { querySelectorOrThrow } from '../../../../misc/dom/query-selector-or-throw';
import { VirtualCustomElementNode } from '../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { MatRippleComponent } from '../buttons/ripple/mat-ripple.component';

// @ts-ignore
import html from './mat-sidenav-container.component.html?raw';
// @ts-ignore
import style from './mat-sidenav-container.component.scss?inline';

/** TYPES **/

// https://material.angular.io/components/sidenav/examples

export type IMatSidenavComponentMode =
  | 'over'
  | 'push'
  ;

export type IMatSidenavComponentPosition =
  | 'start'
  | 'end'
  ;

// export type IMatSidenavComponentUserCloseEvent = CustomEvent<'backdrop' | 'escape'>;
export type IMatSidenavComponentUserCloseType =
  | 'backdrop'
  | 'escape'
  ;

/**
 * COMPONENT: 'mat-sidenav-container'
 */

interface IData {
  readonly hasBackdrop$: IObservable<boolean>;
  readonly onClickBackdrop: IObserver<MouseEvent>;
  readonly onClickDrag: IObserver<MouseEvent>;
  readonly onKeyDownSidenav: IObserver<KeyboardEvent>;
}

interface IMatSidenavContainerComponentConfig {
  inputs: [
    ['mode', IMatSidenavComponentMode],
    ['position', IMatSidenavComponentPosition],
    ['hasBackdrop', boolean],
    ['enableUserClose', boolean],
    ['opened', boolean],
  ];
  outputs: [
    ['userClose', IMatSidenavComponentUserCloseType],
  ],
  data: IData;
}

export const MatSidenavContainerComponent = createComponent<IMatSidenavContainerComponentConfig>({
  name: 'mat-sidenav-container',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatRippleComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['mode', 'over'],
    ['position', 'start'],
    ['hasBackdrop', true],
    ['enableUserClose', false],
    ['opened', false],
  ],
  outputs: [
    'userClose',
  ],
  init: (node: VirtualCustomElementNode<IMatSidenavContainerComponentConfig>): IData => {
    const element: HTMLElement = node.elementNode;

    const { getValue: enableUserClose } = node.inputs.getSource('enableUserClose');

    const mode$ = node.inputs.get$('mode');
    const position$ = node.inputs.get$('position');
    const hasBackdrop$ = node.inputs.get$('hasBackdrop');

    const {
      emit: $opened,
      subscribe: opened$,
      getValue: opened,
    } = node.inputs.getSource('opened');

    const $userClose = node.outputs.$set('userClose');

    node.setReactiveClass('mat-opened', opened$);
    node.setReactiveClass('mat-has-backdrop', hasBackdrop$);

    const classList$ = function$$(
      [mode$, position$],
      (mode, position) => {
        return new Set([
          `mat-mode-${mode}`,
          `mat-position-${position}`,
        ]);
      },
    );
    node.setReactiveClassNamesList(classList$);

    const onClickBackdrop = (): void => {
      $userClose('backdrop');

      if (enableUserClose()) {
        $opened(false);
      }
    };

    const onClickDrag = (): void => {
      $opened(!opened());
    };

    const onKeyDownSidenav = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        $userClose('escape');

        if (enableUserClose()) {
          $opened(false);
          (document.activeElement as HTMLElement)?.blur?.();
        }
      }
    };

    // TODO improve later
    node.onConnected$(opened$)((opened: boolean): void => {
      if (opened) {
        queueMicrotask(() => {
          querySelectorOrThrow<HTMLElement>(element, `:scope > .sidenav > .content`).focus();
        });
      }
    });

    return {
      hasBackdrop$,

      onClickBackdrop,
      onClickDrag,
      onKeyDownSidenav,
    };
  },
});

