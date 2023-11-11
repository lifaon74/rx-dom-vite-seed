import { math_clamp } from '@lifaon/math';

export interface IPosition {
  readonly left: number;
  readonly top: number;
}

export interface IRectangle {
  readonly width: number;
  readonly height: number;
}

export interface IArea extends IPosition, IRectangle {
}

export function getHTMLElementScrollPosition(
  element: HTMLElement,
): IPosition {
  return {
    left: element.scrollLeft,
    top: element.scrollTop,
  };
}

export function getPointerEventPosition(
  event: PointerEvent | MouseEvent,
): IPosition {
  return {
    left: event.clientX,
    top: event.clientY,
  };
}

export function getHTMLElementArea(
  element: HTMLElement,
): IArea {
  return element.getBoundingClientRect();
}

export function getHTMLElementAreaRelativeToParent(
  element: HTMLElement,
): IArea {
  return {
    left: element.offsetLeft,
    top: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}

export function areAreaIntersecting(
  areaA: IArea,
  areaB: IArea,
): boolean {
  return (
    ((areaA.left + areaA.width) >= areaB.left)
    && (areaA.left <= (areaB.left + areaB.width))
    && ((areaA.top + areaA.height) >= areaB.top)
    && (areaA.top <= (areaB.top + areaB.height))
  );
}

// export function getItemsInArea(
//   items: readonly IArea[],
// ): number[] {
//   const selectedFiles = new Set<string>();
//
//   // console.time('compute');
//   for (let i = 0, l = files.length; i < l; i++) {
//     const [fileId, element]: IFileIdWithElement = files[i];
//
//     const elementLeft = element.offsetLeft;
//     const elementWidth = element.offsetWidth;
//     const elementRight = elementLeft + elementWidth;
//
//     const elementTop = element.offsetTop;
//     const elementHeight = element.offsetHeight;
//     const elementBottom = elementTop + elementHeight;
//
//     if (
//       (elementRight >= left)
//       && (elementLeft <= (left + width))
//       && (elementBottom >= top)
//       && (elementTop <= (top + height))
//     ) {
//       selectedFiles.add(fileId);
//     }
//   }
//   // console.timeEnd('compute');
//
//   return selectedFiles;
// }


