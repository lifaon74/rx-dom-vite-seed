import {
  $log,
  IMapFilterMapFunctionReturn,
  IObservable,
  MAP_FILTER_DISCARD,
  mapFilter$$,
  toPromise,
} from '@lirx/core';
import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import { IMatSnackbarControllerOptions, IMatSnackbarControllerState, MatSnackbarController } from '../controller/mat-snackbar-controller';

/** TYPES **/

export interface IMatSnackbarManagerOptions {
  manager: MatOverlayManager,
}

/* OPEN */

export interface IMatSnackbarManagerOpenOptions extends Omit<IMatSnackbarControllerOptions, 'manager'> {

}

export interface IMatSnackbarManagerOpenResultCloseFunction {
  (): void;
}

export interface IMatSnackbarManagerOpenResult extends Pick<MatSnackbarController, 'state$' | 'close'> {
}

/** CLASS **/

export class MatSnackbarManager {
  protected readonly _manager: MatOverlayManager;
  protected _closeCurrent: () => Promise<void>;

  constructor(
    {
      manager,
    }: IMatSnackbarManagerOptions,
  ) {
    this._manager = manager;
    this._closeCurrent = () => Promise.resolve();
  }

  open(
    options: IMatSnackbarManagerOpenOptions,
  ): IMatSnackbarManagerOpenResult {
    const snackbar = new MatSnackbarController({
      manager: this._manager,
      ...options,
    });

    let closed: boolean = false;

    const state$ = snackbar.state$;
    state$($log);

    const close = (): void => {
      if (!closed) {
        closed = true;
        snackbar.close();
      }
    };

    const openPromise = this._closeCurrent().then((): void => {
      snackbar.open();
    });

    this._closeCurrent = (): Promise<void> => {
      return openPromise
        .then(() => {
          close();
          return untilClosed(state$);
        });
    };

    return {
      state$,
      close,
    };
  }
}

/** FUNCTIONS **/

export function untilClosed$$(
  state$: IObservable<IMatSnackbarControllerState>,
): IObservable<void> {
  return mapFilter$$(state$, (state: IMatSnackbarControllerState): IMapFilterMapFunctionReturn<void> => {
    return (state === 'closed')
      ? void 0
      : MAP_FILTER_DISCARD;
  });
}

export function untilClosed(
  state$: IObservable<IMatSnackbarControllerState>,
): Promise<void> {
  return toPromise(untilClosed$$(state$));
}
