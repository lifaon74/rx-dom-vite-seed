import { fromSingleAnimationFrame, IObservable, switchMap$$, timeout } from '@lirx/core';
import { IGenericVirtualCustomElementNode } from '@lirx/dom';
import { onTransitionEndObservable } from '../../../../helpers/transition/on-transition-end-observable';

export function closeMatOverlayWithAnimation(
  matDialogNode: IGenericVirtualCustomElementNode,
): IObservable<void> {
  // matDialogNode.setClass('mat-with-animation', false);
  // matDialogNode.setClass('mat-open', true);
  // matDialogNode.setClass('mat-with-animation', true);
  return switchMap$$(
    // fromSingleAnimationFrame(),
    timeout(10),
    (): IObservable<void> => {
      matDialogNode.setClass('mat-open', false);
      matDialogNode.setClass('mat-close', true);
      return onTransitionEndObservable(matDialogNode.elementNode);
    },
  );
}
