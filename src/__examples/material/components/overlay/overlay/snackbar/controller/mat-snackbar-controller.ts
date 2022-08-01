import { IMulticastReplayLastSource, IObservable, IUnsubscribe, let$$ } from '@lirx/core';
import { IGenericVirtualCustomElementNode, VirtualCustomElementNode } from '@lirx/dom';
import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import { closeMatOverlayWithAnimation } from '../../helpers/close-mat-overlay-with-animation';
import { IMatSnackbarComponentConfig, MatSnackbarComponent } from '../snackbar/mat-snackbar.component';

/** TYPES **/

export interface IMatSnackbarControllerOptionsOnClickAction {
  (
    event: MouseEvent,
  ): void;
}

export interface IMatSnackbarControllerOptions {
  manager: MatOverlayManager,
  message: string;
  actionText?: string | undefined;
  onClickAction?: IMatSnackbarControllerOptionsOnClickAction;
}

export type IMatSnackbarControllerState =
  | 'opening'
  | 'opened'
  | 'closing'
  | 'closed'
  ;

// https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
export function openMatSnackbarWithAnimation(
  matDialogNode: IGenericVirtualCustomElementNode,
): void {
  return openMatSnackbarElementWithAnimation(matDialogNode.elementNode);
}

export function openMatSnackbarElementWithAnimation(
  element: HTMLElement,
): void {
  // element.animate([
  //   {
  //     opacity: '0',
  //     transform: 'translateX(calc(-100% - var(--mat-snackbar-horizontal-offset, 24px)))',
  //   },
  //   {
  //     opacity: '1',
  //     transform: 'translateX(0)',
  //   },
  // ], 2000).pause();

  const keyframes = new KeyframeEffect(
    element,
    [
      {
        opacity: '0',
        transform: 'translateX(calc(-100% - var(--mat-snackbar-horizontal-offset, 24px)))',
      },
      {
        opacity: '1',
        transform: 'translateX(0)',
      },
    ],
    { duration: 3000 },
  );

  const animation = new Animation(keyframes);

  animation.play();
}

export function createMatSnackbarOpenAnimation(
  element: HTMLElement,
): Animation {
  return new Animation(new KeyframeEffect(
    element,
    [
      {
        opacity: '0',
        transform: 'translateX(calc(-100% - var(--mat-snackbar-horizontal-offset, 24px)))',
      },
      {
        opacity: '1',
        transform: 'translateX(0)',
      },
    ],
    { duration: 3000 },
  ));
}

/** CLASS **/

export class MatSnackbarController {
  protected readonly _manager: MatOverlayManager;
  protected readonly _node: VirtualCustomElementNode<IMatSnackbarComponentConfig>;
  protected readonly _$state$: IMulticastReplayLastSource<IMatSnackbarControllerState>;
  protected _unsubscribeOfOpen: IUnsubscribe | undefined;
  protected _unsubscribeOfClose: IUnsubscribe | undefined;

  constructor(
    {
      manager,
      message,
      actionText,
      onClickAction,
    }: IMatSnackbarControllerOptions,
  ) {
    this._manager = manager;
    this._node = MatSnackbarComponent.create();
    // this._node = this._manager.open(MatSnackbarComponent);
    this._$state$ = let$$<IMatSnackbarControllerState>('closed');
    this._unsubscribeOfOpen = void 0;
    this._unsubscribeOfClose = void 0;

    this._node.inputs.set('message', message);
    this._node.inputs.set('actionText', actionText);

    if (onClickAction !== void 0) {
      this._node.outputs.get$('clickAction')(onClickAction);
    }
  }

  get state(): IMatSnackbarControllerState {
    return this._$state$.getValue();
  }

  get state$(): IObservable<IMatSnackbarControllerState> {
    return this._$state$.subscribe;
  }

  open(): void {
    if (
      (this.state == 'closing')
      || (this.state == 'closed')
    ) {
      if (this._unsubscribeOfClose !== void 0) {
        this._unsubscribeOfClose();
        this._unsubscribeOfClose = void 0;
      }
      this._manager.adopt(this._node);
      this._$state$.emit('opening');
      openMatSnackbarWithAnimation(this._node);
      // this._unsubscribeOfOpen = openMatOverlayWithAnimation(this._node)(() => {
      //   this._unsubscribeOfOpen = void 0;
      //   // console.log('opened');
      //   this._$state$.emit('opened');
      // });
    }
  }

  close(): void {
    if (
      (this.state == 'opening')
      || (this.state == 'opened')
    ) {
      if (this._unsubscribeOfOpen !== void 0) {
        this._unsubscribeOfOpen();
        this._unsubscribeOfOpen = void 0;
      }
      this._$state$.emit('closing');
      // console.time('closing');
      this._unsubscribeOfClose = closeMatOverlayWithAnimation(this._node)(() => {
        this._unsubscribeOfClose = void 0;
        this._$state$.emit('closed');
        // console.log('closed');
        // console.timeEnd('closing');
        this._manager.close(this._node);
      });
    }
  }
}
