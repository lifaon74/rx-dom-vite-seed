import { timeout } from '@lirx/core';

/** FUNCTIONS **/

export interface ICreateRippleOptions {
  x: number;
  y: number;
  radius: number;
  color: string;
  openDuration?: number;
  closeDuration?: number;
}

export interface IRipple {
  element: HTMLElement;
  open: () => Promise<void>;
  close: () => Promise<void>;
}

export type IRippleState =
  | 'closed'
  | 'opening'
  | 'opened'
  | 'closing';

export function createRipple(
  {
    x,
    y,
    radius,
    color,
    openDuration = 200,
    closeDuration = 200,
  }: ICreateRippleOptions,
): IRipple {
  const element: HTMLDivElement = document.createElement('div');
  const styleDeclaration: CSSStyleDeclaration = element.style;

  const left: string = `${x - radius}px`;
  const right: string = `${y - radius}px`;
  const size: string = `${radius * 2}px`;

  const curve: string = 'cubic-bezier(0, 0, 0.2, 1)';

  styleDeclaration.setProperty('position', 'absolute');
  styleDeclaration.setProperty('left', left);
  styleDeclaration.setProperty('top', right);
  styleDeclaration.setProperty('width', size);
  styleDeclaration.setProperty('height', size);
  styleDeclaration.setProperty('background-color', color);
  styleDeclaration.setProperty('border-radius', '50%');
  // styleDeclaration.setProperty('box-shadow', 'inset 0 0 20% 0 rgba(0, 0, 0, 0.15)');

  let state: IRippleState = 'closed';

  const open = (): Promise<void> => {
    return new Promise<void>((
      resolve: () => void,
      reject: (reason?: any) => void,
    ): void => {
      if (state === 'closed') {
        state = 'opening';

        styleDeclaration.removeProperty('transition');
        // styleDeclaration.setProperty('transform', 'scale(0.5)');
        // styleDeclaration.setProperty('opacity', '0.5');
        styleDeclaration.setProperty('transform', 'scale(0)');
        styleDeclaration.setProperty('opacity', '0');
        styleDeclaration.setProperty('transition', `transform ${openDuration}ms ${curve}, opacity ${Math.floor(openDuration / 2)}ms ${curve}`);

        const _resolve = (): void => {
          unsubscribe();
          state = 'opened';
          resolve();
        };

        const transitionend$ = timeout(openDuration);

        const unsubscribe = transitionend$(_resolve);

        requestAnimationFrame(() => {
          styleDeclaration.setProperty('opacity', '1');
          styleDeclaration.setProperty('transform', 'scale(1)');
        });
      } else {
        reject(new Error(`Current state is not closed: ${state}`));
      }
    });
  };

  const close = (): Promise<void> => {
    return new Promise<void>((
      resolve: () => void,
      reject: (reason?: any) => void,
    ): void => {
      if (state === 'opened') {
        state = 'closing';

        const _resolve = (): void => {
          unsubscribe();
          state = 'closed';
          resolve();
        };

        const transitionend$ = timeout(closeDuration);

        styleDeclaration.setProperty('opacity', '0');

        const unsubscribe = transitionend$(_resolve);
      } else {
        reject(new Error(`Current state is not opened: ${state}`));
      }
    });
  };

  return {
    element,
    open,
    close,
  };
}
