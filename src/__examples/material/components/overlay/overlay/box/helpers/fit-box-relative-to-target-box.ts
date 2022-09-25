import { math_clamp } from '@lirx/animations';
import { IPositionAndSize2D } from '../types/2d/position-and-size/position-and-size-2d.type';
import { ISize2D } from '../types/2d/size/size-2d.type';

/*
  |--------------------------------------------|
  |               externalBox                  |
  |                                            |
  |                   |---------------|        |
  |                   |   targetBox   |        |
  |                   |---------------|        |
  |                   |------------------|     |
  |                   |   expectedBox    |     |
  |                   |                  |     |
  |                   |                  |     |
  |                   |------------------|     |
  |--------------------------------------------|
 */

export function fitBoxRelativeToTargetBoxWith$BottomLeft$TopLeftPreference(
  externalBox: IPositionAndSize2D,
  targetBox: IPositionAndSize2D,
  expectedBox: ISize2D,
): IPositionAndSize2D {
  const width: number = Math.min(expectedBox.width, externalBox.width);
  const left: number = math_clamp(targetBox.left, externalBox.left, externalBox.width - width + externalBox.left);

  const availableHeightOnTop: number = Math.max(targetBox.top - externalBox.top, 0);
  const availableHeightOnBottom: number = Math.max(externalBox.top + externalBox.height - targetBox.top - targetBox.height, 0);

  let height: number, top: number;

  const bottom: boolean = (availableHeightOnBottom >= expectedBox.height) // enough space on bottom
    || (
      (availableHeightOnTop < expectedBox.height) // not enough space on top
      && (availableHeightOnBottom >= availableHeightOnTop)
    );

  if (bottom) {
    height = Math.min(expectedBox.height, availableHeightOnBottom);
    top = math_clamp(targetBox.top + targetBox.height, externalBox.top, externalBox.top + externalBox.height);
  } else {
    height = Math.min(expectedBox.height, availableHeightOnTop);
    top = targetBox.top - height;
  }

  return {
    left,
    top,
    width,
    height,
  };
}
