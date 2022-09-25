import { IPositionAndSize2D } from '../types/2d/position-and-size/position-and-size-2d.type';

export interface IGetTargetBoxForTargetElementWithMarginOptions {
  targetElementPositionAndSize: IPositionAndSize2D;
  elementMargin?: number;
}

export function getTargetBoxForTargetElementWithMargin(
  {
    targetElementPositionAndSize: {
      left,
      top,
      width,
      height,
    },
    elementMargin = 5,
  }: IGetTargetBoxForTargetElementWithMarginOptions,
): IPositionAndSize2D {
  return {
    left,
    top: top - elementMargin,
    width: width,
    height: height + (elementMargin * 2),
  };
}
