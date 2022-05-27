import { createRipple, ICreateRippleOptions, IRipple } from './create-ripple';

export interface ICreateRippleFromElementAndPointerEventOptions extends Omit<ICreateRippleOptions, 'x' | 'y' | 'radius'> {
  element: HTMLElement;
  event: PointerEvent;
  radius?: number;
}

export function createRippleFromElementAndPointerEvent(
  {
    element,
    event,
    radius,
    ...options
  }: ICreateRippleFromElementAndPointerEventOptions,
): IRipple {
  const clientRect: DOMRect = element.getBoundingClientRect();

  const x: number = event.clientX - clientRect.x;
  const y: number = event.clientY - clientRect.y;

  if (radius === void 0) {
    const x2: number = clientRect.width - x;
    const y2: number = clientRect.height - y;
    const d2_top_left: number = (x * x) + (y * y);
    const d2_top_right: number = (x * x) + (y2 * y2);
    const d2_bottom_left: number = (x2 * x2) + (y * y);
    const d2_bottom_right: number = (x2 * x2) + (y2 * y2);

    radius = Math.sqrt(
      Math.max(
        d2_top_left,
        d2_top_right,
        d2_bottom_left,
        d2_bottom_right,
      ),
    );
  }

  return createRipple({
    ...options,
    x,
    y,
    radius,
  });
}

