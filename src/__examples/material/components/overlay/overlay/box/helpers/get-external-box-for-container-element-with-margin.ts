import { IPositionAndSize2D } from '../types/2d/position-and-size/position-and-size-2d.type';

export interface IGetExternalBoxForContainerElementWithMarginOptions {
  containerElementPositionAndSize: IPositionAndSize2D;
  containerHorizontalMargin?: number;
  containerVerticalMargin?: number;
}

export function getExternalBoxForContainerElementWithMargin(
  {
    containerElementPositionAndSize: {
      width,
      height,
      top,
      left,
    },
    containerHorizontalMargin = 5,
    containerVerticalMargin = 5,
  }: IGetExternalBoxForContainerElementWithMarginOptions,
): IPositionAndSize2D {
  const _containerHorizontalMargin: number = Math.min(containerHorizontalMargin, width / 2);
  const _containerVerticalMargin: number = Math.min(containerVerticalMargin, height / 2);
  return {
    left: top + _containerHorizontalMargin,
    top: left + _containerVerticalMargin,
    width: width - (_containerHorizontalMargin * 2),
    height: height - (_containerVerticalMargin * 2),
  };
}

