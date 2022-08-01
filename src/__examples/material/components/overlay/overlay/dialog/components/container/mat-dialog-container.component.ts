import {
  distinct$$$,
  fromResizeObserver,
  function$$,
  IObservable,
  IObserver,
  let$$,
  map$$,
  map$$$,
  switchMap$$$,
  pipe$$$,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  IGenericVirtualCustomElementNode,
  ISetStyleProperty,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { NODE_REFERENCE_MODIFIER } from '../../../../../../modifiers/node-reference.modifier';
import { MatDialogActionsComponent } from '../actions/mat-dialog-actions.component';
import { MatDialogCloseComponent } from '../close/mat-dialog-close.component';
import { MatDialogContentComponent } from '../content/mat-dialog-content.component';
import { MatDialogTitleComponent } from '../title/mat-dialog-title.component';

// @ts-ignore
import html from './mat-dialog-container.component.html?raw';
// @ts-ignore
import style from './mat-dialog-container.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-container'
 */

interface IData {
  readonly $onClickCloseIcon: IObserver<MouseEvent>;
  readonly $matDialogTitleRef: IObserver<IGenericVirtualCustomElementNode>;
  readonly $matDialogActionsRef: IObserver<IGenericVirtualCustomElementNode>;
  readonly matDialogContentHeightProperty$: IObservable<ISetStyleProperty>;
}

export interface IMatDialogContainerComponentConfig {
  element: HTMLElement;
  outputs: [
    ['clickCloseIcon', MouseEvent],
  ];
  data: IData;
}

export const MatDialogContainerComponent = createComponent<IMatDialogContainerComponentConfig>({
  name: 'mat-dialog-container',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatDialogCloseComponent,
      MatDialogTitleComponent,
      MatDialogContentComponent,
      MatDialogActionsComponent,
    ],
    modifiers: [
      NODE_REFERENCE_MODIFIER,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  outputs: [
    'clickCloseIcon',
  ],
  init: (node: VirtualCustomElementNode<IMatDialogContainerComponentConfig>): IData => {

    const $onClickCloseIcon = node.outputs.$set('clickCloseIcon');

    const { emit: $matDialogTitleRef, subscribe: matDialogTitleRef$ } = let$$<IGenericVirtualCustomElementNode>();
    const { emit: $matDialogActionsRef, subscribe: matDialogActionsRef$ } = let$$<IGenericVirtualCustomElementNode>();

    const getElementHeight$$ = pipe$$$([
      switchMap$$$((node: IGenericVirtualCustomElementNode): IObservable<ResizeObserverEntry> => {
        return fromResizeObserver(node.elementNode as HTMLElement);
      }),
      map$$$((entry: ResizeObserverEntry): number => {
        return (entry.target as HTMLElement).offsetHeight;
      }),
      distinct$$$<number>(),
    ]);

    const matDialogTitleHeight$ = getElementHeight$$(matDialogTitleRef$);
    const matDialogActionsHeight$ = getElementHeight$$(matDialogActionsRef$);

    const matDialogContentHeight$ = function$$(
      [matDialogTitleHeight$, matDialogActionsHeight$],
      (matDialogTitleHeight, matDialogActionsHeight$): number => {
        return window.innerHeight - matDialogTitleHeight - matDialogActionsHeight$;
      },
    );

    const matDialogContentHeightProperty$ = map$$(matDialogContentHeight$, (height: number): ISetStyleProperty => {
      return {
        value: `${height}px`,
      };
    });

    return {
      $onClickCloseIcon,
      $matDialogTitleRef,
      matDialogContentHeightProperty$,
      $matDialogActionsRef,
    };
  },
});
