import { querySelectorOrThrow } from '@lirx/dom';
import {
  createManualStylePropertyTransition, createNumberTransition,
  IVoidTransitionFunction,
  mapTransition,
  parallelTransitions,
} from '@lirx/animations';
import { IOpenCloseAnimationControllerOptions, OpenAnimationController } from '../../helpers/open-animation-controller';
import { IMatDialogVirtualCustomElementNode } from '../components/dialog/mat-dialog.component';

/** TYPES **/

export interface IMatDialogAnimatedOptions extends //
  Omit<IOpenCloseAnimationControllerOptions, 'transition' | 'animationDuration'>,
  Partial<Pick<IOpenCloseAnimationControllerOptions, 'animationDuration'>>,
  Omit<IGetMatDialogAnimationTransitionOptions, 'element'>
//
{
  node: IMatDialogVirtualCustomElementNode;
}

/** CLASS **/

export class MatDialogAnimated extends OpenAnimationController {
  constructor(
    {
      node,
      animationDuration = 150,
      ...option
    }: IMatDialogAnimatedOptions,
  ) {
    const transition: IVoidTransitionFunction = getMatDialogAnimationTransition({
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

interface IGetMatDialogAnimationTransitionOptions {
  element: HTMLElement;
}

function getMatDialogAnimationTransition(
  {
    element,
  }: IGetMatDialogAnimationTransitionOptions,
): IVoidTransitionFunction {
  const contentElement: HTMLElement = querySelectorOrThrow(element, ':scope > .content');

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
