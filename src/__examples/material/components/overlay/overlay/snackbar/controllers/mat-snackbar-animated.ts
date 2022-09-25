import {
  createManualStylePropertyTransition, createNumberTransition,
  ITransitionFunction, IVoidTransitionFunction,
  mapTransition,
  parallelTransitions,
} from '@lirx/animations';
import { IOpenCloseAnimationControllerOptions, OpenAnimationController } from '../../helpers/open-animation-controller';
import {
  IMatSnackbarComponentHorizontalPosition,
  IMatSnackbarComponentVerticalPosition,
  IMatSnackbarVirtualCustomElementNode,
  MAT_SNACKBAR_COMPONENT_DEFAULT_HORIZONTAL_POSITION,
  MAT_SNACKBAR_COMPONENT_DEFAULT_VERTICAL_POSITION,
} from '../snackbar/mat-snackbar.component';

/** TYPES **/

export interface IMatSnackbarAnimatedOptions extends //
  Omit<IOpenCloseAnimationControllerOptions, 'transition' | 'animationDuration'>,
  Partial<Pick<IOpenCloseAnimationControllerOptions, 'animationDuration'>>,
  Omit<IGetMatSnackbarAnimationTransitionOptions, 'element'>
//
{
  node: IMatSnackbarVirtualCustomElementNode;
}

/** CLASS **/

export class MatSnackbarAnimated extends OpenAnimationController {
  protected readonly _node: IMatSnackbarVirtualCustomElementNode;

  constructor(
    {
      node,
      animationDuration = 150,
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

    this._node = node;
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

  transition(0);

  return transition;
}

interface IGetMatSnackbarAnimationTransformTransitionOptions {
  horizontalPosition?: IMatSnackbarComponentHorizontalPosition | undefined;
  verticalPosition?: IMatSnackbarComponentVerticalPosition | undefined;
}

function getMatSnackbarAnimationTransformTransition(
  {
    horizontalPosition = MAT_SNACKBAR_COMPONENT_DEFAULT_HORIZONTAL_POSITION,
    verticalPosition = MAT_SNACKBAR_COMPONENT_DEFAULT_VERTICAL_POSITION,
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


