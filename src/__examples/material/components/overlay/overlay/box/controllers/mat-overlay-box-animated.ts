import {
  createManualStylePropertyTransition, createNumberTransition,
  IVoidTransitionFunction,
  mapTransition,
  parallelTransitions,
} from '@lirx/animations';
import { IOpenCloseAnimationControllerOptions, OpenCloseAnimationController } from '../../helpers/open-close-animation-controller';
import { IMatOverlayBoxVirtualCustomElementNode } from '../components/box/mat-overlay-box.component';
import { IMatOverlayBoxStickyVirtualCustomElementNode } from '../components/sticky/mat-overlay-box-sticky.component';

/** TYPES **/

export interface IMatOverlayBoxAnimatedOptions extends //
  Omit<IOpenCloseAnimationControllerOptions, 'transition' | 'animationDuration'>,
  Partial<Pick<IOpenCloseAnimationControllerOptions, 'animationDuration'>>,
  Omit<IGetMatOverlayBoxAnimationTransitionOptions, 'element'>
//
{
  node: IMatOverlayBoxVirtualCustomElementNode | IMatOverlayBoxStickyVirtualCustomElementNode;
}

/** CLASS **/

export class MatOverlayBoxAnimated extends OpenCloseAnimationController {
  constructor(
    {
      node,
      animationDuration = 150,
      ...option
    }: IMatOverlayBoxAnimatedOptions,
  ) {
    const transition: IVoidTransitionFunction = getMatOverlayBoxAnimationTransition({
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

interface IGetMatOverlayBoxAnimationTransitionOptions {
  element: HTMLElement;
}

function getMatOverlayBoxAnimationTransition(
  {
    element,
  }: IGetMatOverlayBoxAnimationTransitionOptions,
): IVoidTransitionFunction {
  const opacityTransition = createManualStylePropertyTransition(
    element,
    'opacity',
    mapTransition(createNumberTransition(0, 1), String),
  );

  const transition = parallelTransitions([
    opacityTransition,
  ]);

  element.style.willChange = 'opacity';

  transition(0);

  return transition;
}
