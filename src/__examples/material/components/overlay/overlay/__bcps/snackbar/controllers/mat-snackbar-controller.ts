import { ITransitionProgress } from '@lirx/animations';
import { IObservable, IObservableLike, single, toObservable } from '@lirx/core';
import {
  virtualCustomElementNodeSetInput,
  virtualCustomElementNodeSetReactiveInput,
  virtualCustomElementNodeSetReactiveOutput,
} from '@lirx/dom';
import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import {
  IMatSnackbarComponentConfig,
  IMatSnackbarComponentHorizontalPosition,
  IMatSnackbarComponentVerticalPosition,
  IMatSnackbarComponentWidth,
  IMatSnackbarVirtualCustomElementNode,
  MatSnackbarComponent,
} from '../mat-snackbar/mat-snackbar.component';
import { IMatSnackbarAnimatedOptions, MatSnackbarAnimated } from './mat-snackbar-animated';

/** TYPES **/

export interface IMatSnackbarControllerOptions extends IMatSnackbarAnimatedOptions {
  manager: MatOverlayManager;
}

/* CREATE */

export interface IMatSnackbarControllerOptionsOnClickAction {
  (
    event: MouseEvent,
  ): void;
}

export interface ICreateMatSnackbarAnimatedOptions extends //
  Omit<IMatSnackbarControllerOptions, 'node'>
//
{
  message: IObservableLike<string>;
  actionText?: IObservableLike<string | undefined>;
  horizontalPosition?: IMatSnackbarComponentHorizontalPosition | undefined;
  verticalPosition?: IMatSnackbarComponentVerticalPosition | undefined;
  width?: IMatSnackbarComponentWidth | undefined;
  onClickAction?: IMatSnackbarControllerOptionsOnClickAction;
}

/** CLASS **/

export class MatSnackbarController extends MatSnackbarAnimated {
  static create(
    {
      message,
      actionText = single(void 0),
      horizontalPosition,
      verticalPosition,
      width,
      onClickAction,
      ...option
    }: ICreateMatSnackbarAnimatedOptions,
  ): MatSnackbarController {
    const node: IMatSnackbarVirtualCustomElementNode = MatSnackbarComponent.create();

    const message$: IObservable<string> = toObservable(message);
    const actionText$: IObservable<string | undefined> = toObservable(actionText);

    virtualCustomElementNodeSetReactiveInput<IMatSnackbarComponentConfig, 'message'>(node, 'message', message$);
    virtualCustomElementNodeSetReactiveInput<IMatSnackbarComponentConfig, 'actionText'>(node, 'actionText', actionText$);

    if (onClickAction !== void 0) {
      virtualCustomElementNodeSetReactiveOutput<IMatSnackbarComponentConfig, 'clickAction'>(node, 'clickAction', onClickAction);
    }

    virtualCustomElementNodeSetInput<IMatSnackbarComponentConfig, 'horizontalPosition'>(node, 'horizontalPosition', horizontalPosition);
    virtualCustomElementNodeSetInput<IMatSnackbarComponentConfig, 'verticalPosition'>(node, 'verticalPosition', verticalPosition);
    virtualCustomElementNodeSetInput<IMatSnackbarComponentConfig, 'width'>(node, 'width', width);

    return new MatSnackbarController({
      ...option,
      horizontalPosition,
      verticalPosition,
      node,
    });
  }

  protected readonly _manager: MatOverlayManager;

  constructor(
    {
      manager,
      ...options
    }: IMatSnackbarControllerOptions,
  ) {
    super(options);
    this._manager = manager;
  }

  override open(): Promise<ITransitionProgress> {
    if (!this._manager.has(this._node)) {
      this._manager.adopt(this._node);
    }
    return super.open();
  }

  override close(): Promise<ITransitionProgress> {
    return super.close()
      .then((progress: ITransitionProgress): ITransitionProgress => {
        if (
          (progress === 1)
          && this._manager.has(this._node)
        ) {
          this._manager.close(this._node);
        }
        return progress;
      });
  }

}

