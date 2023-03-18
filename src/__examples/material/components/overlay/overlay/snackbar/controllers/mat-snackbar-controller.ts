import { ITransitionProgress } from '@lirx/animations';
import { IObservable, IObservableLike, IUnsubscribe, mergeUnsubscribeFunctions, single, toObservable } from '@lirx/core';
import { VirtualCustomElementNode } from '@lirx/dom';
import { noop } from '@lirx/utils';
import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import {
  IMatSnackbarComponentConfig,
  IMatSnackbarComponentHorizontalPosition,
  IMatSnackbarComponentVerticalPosition,
  IMatSnackbarComponentWidth,
  MatSnackbarComponent,
} from '../snackbar/mat-snackbar.component';
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
    const node: VirtualCustomElementNode<IMatSnackbarComponentConfig> = MatSnackbarComponent.create();

    let unsusbscribe: IUnsubscribe = noop;

    const message$: IObservable<string> = toObservable(message);
    const actionText$: IObservable<string | undefined> = toObservable(actionText);

    node.isConnected$((connected: boolean): void => {
      if (connected) {
        unsusbscribe = mergeUnsubscribeFunctions([
          message$(node.inputs.$set('message')),
          actionText$(node.inputs.$set('actionText')),
          ...optionalArrayValues(onClickAction, (onClickAction) => node.outputs.get$('clickAction')(onClickAction)),
        ]);
      } else {
        unsusbscribe();
      }
    });

    node.inputs.set('horizontalPosition', horizontalPosition);
    node.inputs.set('verticalPosition', verticalPosition);
    node.inputs.set('width', width);

    return new MatSnackbarController({
      ...option,
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

/** FUNCTIONS **/

/* OTHERS */

function optionalArrayValues<GValue, GItem>(
  value: GValue | undefined,
  factory: (value: GValue) => GItem,
): GItem[] {
  return (value === void 0)
    ? []
    : [
      factory(value),
    ];
}


