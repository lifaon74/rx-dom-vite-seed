import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import { MatSnackbarController } from './mat-snackbar-controller';
import { IMatSnackbarAnimatedOptions } from './mat-snackbar-animated2';

/** TYPES **/

export interface IMatSnackbarQueueManagerOptions {
  manager: MatOverlayManager,
}

/* OPEN */

export interface IMatSnackbarQueueManagerOpenOptions extends Omit<IMatSnackbarAnimatedOptions, 'manager'> {
  duration?: number;
}

export interface IMatSnackbarQueueManagerCloseFunction {
  (): Promise<void>;
}

/** CLASS **/

export class MatSnackbarQueueManager {
  protected readonly _manager: MatOverlayManager;
  protected _openPromise: Promise<IMatSnackbarQueueManagerCloseFunction>;

  constructor(
    {
      manager,
    }: IMatSnackbarQueueManagerOptions,
  ) {
    this._manager = manager;
    this._openPromise = Promise.resolve<IMatSnackbarQueueManagerCloseFunction>(() => Promise.resolve());
  }

  open(
    {
      duration,
      ...options
    }: IMatSnackbarQueueManagerOpenOptions,
  ): Promise<IMatSnackbarQueueManagerCloseFunction> {
    return this._openPromise = this._openPromise
      .then((close: IMatSnackbarQueueManagerCloseFunction): Promise<void> => {
        return close();
      })
      .then((): Promise<IMatSnackbarQueueManagerCloseFunction> => {
        const snackbar = MatSnackbarController.create({
          manager: this._manager,
          ...options,
        });

        return snackbar.open()
          .then(() => {
            const close = (): Promise<void> => {
              return snackbar.close();
            };

            if (
              (duration !== void 0)
              && (duration > 0)
            ) {
              setTimeout(close, duration);
            }

            return close;
          });
      });

  }
}

// /** FUNCTIONS **/
//
// export function untilState$$(
//   state$: IObservable<IMatSnackbarAnimatedState>,
//   expectedState: IMatSnackbarAnimatedState,
// ): IObservable<void> {
//   return mapFilter$$(state$, (state: IMatSnackbarAnimatedState): IMapFilterMapFunctionReturn<void> => {
//     return (state === expectedState)
//       ? void 0
//       : MAP_FILTER_DISCARD;
//   });
// }
//
// export function untilState(
//   state$: IObservable<IMatSnackbarAnimatedState>,
//   expectedState: IMatSnackbarAnimatedState,
// ): Promise<void> {
//   return toPromise(untilState$$(state$, expectedState));
// }
//
// export function untilOpened(
//   state$: IObservable<IMatSnackbarAnimatedState>,
// ): Promise<void> {
//   return untilState(state$, 'opened');
// }
//
// export function untilClosed(
//   state$: IObservable<IMatSnackbarAnimatedState>,
// ): Promise<void> {
//   return untilState(state$, 'closed');
// }
