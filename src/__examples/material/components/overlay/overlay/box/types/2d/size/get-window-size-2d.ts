import { ISize2D } from './size-2d.type';

export function getWindowSize2D(): ISize2D {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
