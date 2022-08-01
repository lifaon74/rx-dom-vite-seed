import { IObservable, switchMap$$, timeout } from '@lirx/core';
import { IGenericVirtualCustomElementNode } from '@lirx/dom';
import { onTransitionEndObservable } from '../../../../helpers/transition/on-transition-end-observable';

export function openMatOverlayWithAnimation(
  matDialogNode: IGenericVirtualCustomElementNode,
): IObservable<void> {
  matDialogNode.setClass('mat-with-animation', true);
  return switchMap$$(
    // fromSingleAnimationFrame(),
    timeout(0), // INFO to support firefox
    (): IObservable<void> => {
      matDialogNode.setClass('mat-open', true);
      return onTransitionEndObservable(matDialogNode.elementNode);
    },
  );
}
