import { function$$, IObservable, IObserver, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { MatBasicButtonSecondaryComponent } from '../../../../buttons/button/built-in/basic/secondary/mat-basic-button-secondary.component';

// @ts-ignore
import html from './mat-snackbar.component.html?raw';
// @ts-ignore
import style from './mat-snackbar.component.scss?inline';

/** TYPES **/

export type IMatSnackbarComponentHorizontalPosition =
  | 'left'
  | 'center'
  | 'right'
  ;

export type IMatSnackbarComponentVerticalPosition =
  | 'top'
  | 'bottom'
  ;

export type IMatSnackbarComponentWidth =
  | 'auto'
  | 'static'
  ;

/**
 * COMPONENT: 'mat-snackbar'
 */

interface IData {
  readonly message$: IObservable<string>;
  readonly hasAction$: IObservable<boolean>;
  readonly actionText$: IObservable<string>;
  readonly $onClickActionButton: IObserver<MouseEvent>;
}

export interface IMatSnackbarComponentConfig {
  element: HTMLElement;
  inputs: [
    ['message', string],
    ['actionText', string | undefined],
    ['horizontalPosition', IMatSnackbarComponentHorizontalPosition | undefined],
    ['verticalPosition', IMatSnackbarComponentVerticalPosition | undefined],
    ['width', IMatSnackbarComponentWidth | undefined],
  ];
  outputs: [
    ['clickAction', MouseEvent]
  ],
  data: IData;
}

export type IMatSnackbarVirtualCustomElementNode = VirtualCustomElementNode<IMatSnackbarComponentConfig>;

export const MatSnackbarComponent = createComponent<IMatSnackbarComponentConfig>({
  name: 'mat-snackbar',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatBasicButtonSecondaryComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['message'],
    ['actionText', void 0],
    ['horizontalPosition', void 0],
    ['verticalPosition', void 0],
    ['width', void 0],
  ],
  outputs: [
    'clickAction',
  ],
  init: (node: VirtualCustomElementNode<IMatSnackbarComponentConfig>): IData => {
    // INPUTS
    const message$ = node.inputs.get$('message');
    const actionText$ = node.inputs.get$('actionText');
    const horizontalPosition$ = node.inputs.get$('horizontalPosition');
    const verticalPosition$ = node.inputs.get$('verticalPosition');
    const width$ = node.inputs.get$('width');

    // OUTPUTS
    const $clickAction = node.outputs.$set('clickAction');

    // ACTION
    const actionTextNormalized$ = map$$(actionText$, (value: string | undefined): string => {
      return (value === void 0)
        ? ''
        : value;
    });

    const hasAction$ = map$$(actionTextNormalized$, (actionText: string | undefined): boolean => {
      return (actionText !== '');
    });

    const $onClickActionButton = $clickAction;

    // POSITIONS & WIDTH
    const horizontalPositionNormalized$ = map$$(horizontalPosition$, (value: IMatSnackbarComponentHorizontalPosition | undefined): IMatSnackbarComponentHorizontalPosition => {
      return (value === void 0)
        ? 'right'
        : value;
    });

    const verticalPositionNormalized$ = map$$(verticalPosition$, (value: IMatSnackbarComponentVerticalPosition | undefined): IMatSnackbarComponentVerticalPosition => {
      return (value === void 0)
        ? 'bottom'
        : value;
    });

    const widthNormalized$ = map$$(width$, (value: IMatSnackbarComponentWidth | undefined): IMatSnackbarComponentWidth => {
      return (value === void 0)
        ? 'static'
        : value;
    });

    const classList$ = function$$(
      [horizontalPositionNormalized$, verticalPositionNormalized$, widthNormalized$],
      (horizontalPosition, verticalPosition, width) => {
        return new Set([
          `mat-position-${horizontalPosition}`,
          `mat-position-${verticalPosition}`,
          `mat-width-${width}`,
        ]);
      },
    );
    node.setReactiveClassNamesList(classList$);

    return {
      message$,
      hasAction$,
      actionText$: actionTextNormalized$,
      $onClickActionButton,
    };
  },
});
