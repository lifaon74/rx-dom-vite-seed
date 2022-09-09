import { IObservable, IUnsubscribe, mergeUnsubscribeFunctions, noop, single } from '@lirx/core';
import { IObservableLike, toObservable, VirtualCustomElementNode } from '@lirx/dom';
import { parallelTransitions } from '../../../../../../../__debug/animations/transition/group/parallel-transitions';
import { mapTransition } from '../../../../../../../__debug/animations/transition/modifiers/map-transition';
import { createNumberTransition } from '../../../../../../../__debug/animations/transition/number/create-number-transition';
import {
  createManualStylePropertyTransition,
} from '../../../../../../../__debug/animations/transition/style-property/create-manual-style-property-transition';
import { ITransitionFunction, IVoidTransitionFunction } from '../../../../../../../__debug/animations/transition/transition-function.type';
import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import { IOpenCloseAnimationControllerOptions, OpenAnimationController } from '../../helpers/open-animation-controller';
import {
  IMatSnackbarComponentConfig,
  IMatSnackbarComponentHorizontalPosition,
  IMatSnackbarComponentVerticalPosition, IMatSnackbarComponentWidth,
  IMatSnackbarVirtualCustomElementNode, MatSnackbarComponent,
} from '../snackbar/mat-snackbar.component';

/** TYPES **/

export interface IMatSnackbarAnimatedOptions extends //
  Omit<IOpenCloseAnimationControllerOptions, 'transition' | 'animationDuration'>,
  Partial<Pick<IOpenCloseAnimationControllerOptions, 'animationDuration'>>,
  Omit<IGetMatSnackbarAnimationTransitionOptions, 'element'>
//
{
  manager: MatOverlayManager;
  node: IMatSnackbarVirtualCustomElementNode;
}

export interface IMatSnackbarAnimatedOptionsOnClickAction {
  (
    event: MouseEvent,
  ): void;
}

export interface ICreateMatSnackbarAnimatedOptions extends //
  Omit<IMatSnackbarAnimatedOptions, 'node'>
//
{
  message: IObservableLike<string>;
  actionText?: IObservableLike<string | undefined>;
  horizontalPosition?: IMatSnackbarComponentHorizontalPosition | undefined;
  verticalPosition?: IMatSnackbarComponentVerticalPosition | undefined;
  width?: IMatSnackbarComponentWidth | undefined;
  onClickAction?: IMatSnackbarAnimatedOptionsOnClickAction;
}

/** CLASS **/

export class MatSnackbarController extends OpenAnimationController {
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
  protected readonly _node: IMatSnackbarVirtualCustomElementNode;

  constructor(
    {
      manager,
      node,
      animationDuration = 100,
      ...option
    }: IMatSnackbarAnimatedOptions,
  ) {
    const transition: IVoidTransitionFunction = getMatSnackbarAnimationTransition({
      ...option,
      element: node.elementNode,
    });

    super({
      ...option,
      transition,
      animationDuration,
    });

    this._manager = manager;
    this._node = node;
  }

  override open(): Promise<void> {
    if (!this._manager.has(this._node)) {
      this._manager.adopt(this._node);
    }
    return super.open();
  }

  override close(): Promise<void> {
    return super.close()
      .then(() => {
        this._manager.close(this._node);
      });
  }

}

/** FUNCTIONS **/

/* TRANSITION */

interface IGetMatSnackbarAnimationTransitionOptions extends IGetMatSnackbarAnimationTransformTransitionOptions {
  element: HTMLElement;
}

function getMatSnackbarAnimationTransition(
  {
    element,
    ...options
  }: IGetMatSnackbarAnimationTransitionOptions,
): IVoidTransitionFunction {

  const opacityTransition = createManualStylePropertyTransition(
    element,
    'opacity',
    mapTransition(createNumberTransition(0, 1), String),
  );

  const transformTransition = createManualStylePropertyTransition(
    element,
    'transform',
    getMatSnackbarAnimationTransformTransition(options),
  );

  const transition = parallelTransitions([
    opacityTransition,
    transformTransition,
  ]);

  element.style.willChange = 'transform, opacity';

  opacityTransition(0);
  transformTransition(0);

  return transition;
}

interface IGetMatSnackbarAnimationTransformTransitionOptions {
  horizontalPosition?: IMatSnackbarComponentHorizontalPosition | undefined;
  verticalPosition?: IMatSnackbarComponentVerticalPosition | undefined;
}

function getMatSnackbarAnimationTransformTransition(
  {
    horizontalPosition = 'right',
    verticalPosition = 'bottom',
  }: IGetMatSnackbarAnimationTransformTransitionOptions,
): ITransitionFunction<string> {
  if (horizontalPosition === 'left') {
    return mapTransition(createNumberTransition(-120, 0), _ => `translateX(${_}%)`);
  } else if (horizontalPosition === 'right') {
    return mapTransition(createNumberTransition(120, 0), _ => `translateX(${_}%)`);
  } else {
    if (verticalPosition === 'bottom') {
      return mapTransition(createNumberTransition(120, 0), _ => `translateY(${_}%)`);
    } else {
      return mapTransition(createNumberTransition(-120, 0), _ => `translateY(${_}%)`);
    }
  }
}

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


