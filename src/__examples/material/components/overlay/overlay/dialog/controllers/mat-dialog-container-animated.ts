import { querySelectorOrThrow } from '@lirx/dom';
import {
  createManualStylePropertyTransition, createNumberTransition,
  IVoidTransitionFunction,
  mapTransition,
  parallelTransitions,
} from '@lirx/animations';
import { IOpenCloseAnimationControllerOptions, OpenCloseAnimationController } from '../../helpers/open-close-animation-controller';
import { IMatDialogContainerVirtualCustomElementNode } from '../components/mat-dialog-container/mat-dialog-container.component';

/** TYPES **/

export interface IMatDialogContainerAnimatedOptions extends //
  Omit<IOpenCloseAnimationControllerOptions, 'transition' | 'animationDuration'>,
  Partial<Pick<IOpenCloseAnimationControllerOptions, 'animationDuration'>>,
  Omit<IGetMatDialogContainerAnimationTransitionOptions, 'element'>
//
{
  node: IMatDialogContainerVirtualCustomElementNode;
}

/** CLASS **/

export class MatDialogContainerAnimated extends OpenCloseAnimationController {
  constructor(
    {
      node,
      animationDuration = 150,
      ...option
    }: IMatDialogContainerAnimatedOptions,
  ) {
    const transition: IVoidTransitionFunction = getMatDialogContainerAnimationTransition({
      ...option,
      element: node.elementNode,
    });

    super({
      ...option,
      transition,
      animationDuration,
    });
  }
}

/** FUNCTIONS **/

/* TRANSITION */

interface IGetMatDialogContainerAnimationTransitionOptions {
  element: HTMLElement;
}

function getMatDialogContainerAnimationTransition(
  {
    element,
  }: IGetMatDialogContainerAnimationTransitionOptions,
): IVoidTransitionFunction {
  const contentElement: HTMLElement = querySelectorOrThrow(element, ':scope > *');

  const opacityTransition = createManualStylePropertyTransition(
    element,
    'opacity',
    mapTransition(createNumberTransition(0, 1), String),
  );

  const transformTransition = createManualStylePropertyTransition(
    contentElement,
    'transform',
    mapTransition(createNumberTransition(0.75, 1), _ => `scale(${_})`),
  );

  const transition = parallelTransitions([
    opacityTransition,
    transformTransition,
  ]);

  element.style.willChange = 'opacity';
  contentElement.style.willChange = 'transform';

  transition(0);

  return transition;
}
