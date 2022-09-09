import { querySelectorOrThrow } from '@lirx/dom';
import { parallelTransitions } from '../../../../../../../__debug/animations/transition/group/parallel-transitions';
import { mapTransition } from '../../../../../../../__debug/animations/transition/modifiers/map-transition';
import { createNumberTransition } from '../../../../../../../__debug/animations/transition/number/create-number-transition';
import {
  createManualStylePropertyTransition,
} from '../../../../../../../__debug/animations/transition/style-property/create-manual-style-property-transition';
import { IVoidTransitionFunction } from '../../../../../../../__debug/animations/transition/transition-function.type';
import { IOpenCloseAnimationControllerOptions, OpenAnimationController } from '../../helpers/open-animation-controller';
import { IMatDialogVirtualCustomElementNode } from '../mat-dialog.component';

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

  opacityTransition(0);
  transformTransition(0);

  return transition;
}
