import { ITransitionProgress } from '@lirx/animations';
import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import { ICreateMatSnackbarAnimatedOptions, MatSnackbarController } from './mat-snackbar-controller';

/** TYPES **/

export interface IMatSnackbarQueueManagerOptions {
  manager: MatOverlayManager,
}

/* OPEN */

export interface IMatSnackbarQueueManagerOpenOptions extends Omit<ICreateMatSnackbarAnimatedOptions, 'manager'> {
  displayDuration?: number;
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
      displayDuration,
      ...options
    }: IMatSnackbarQueueManagerOpenOptions,
  ): Promise<IMatSnackbarQueueManagerCloseFunction> {
    return this._openPromise = this._openPromise
      .then((close: IMatSnackbarQueueManagerCloseFunction): Promise<void> => {
        return close();
      })
      .then((): Promise<IMatSnackbarQueueManagerCloseFunction> => {
        const snackbarController = MatSnackbarController.create({
          manager: this._manager,
          ...options,
        });

        return snackbarController.open()
          .then(() => {
            let timer: any;

            const close = (): Promise<void> => {
              if (timer !== void 0) {
                clearTimeout(timer);
                timer = void 0;
              }
              return snackbarController.close()
                .then((progress: ITransitionProgress): void => {
                  if (progress !== 1) {
                    throw new Error(`Unfinished close`);
                  }
                });
            };

            if (
              (displayDuration !== void 0)
              && (displayDuration > 0)
            ) {
              timer = setTimeout(close, displayDuration);
            }

            return close;
          });
      });

  }
}
