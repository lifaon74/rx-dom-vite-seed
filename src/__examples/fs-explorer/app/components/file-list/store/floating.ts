function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.max(min, Math.min(max, value));
}

function normalize(
  value: number,
): number {
  return clamp(value, 0, 1);
}

// export interface ILeft {
//   readonly left: number;
// }
//
// export interface IRight {
//   readonly right: number;
// }
//
// export interface ITop {
//   readonly top: number;
// }
//
// export interface IBottom {
//   readonly bottom: number;
// }
//
// export interface IWidth {
//   readonly width: number;
// }
//
// export interface IHeight {
//   readonly height: number;
// }
//
// export type IComposePositions<GHorizontal extends (ILeft | IRight), GVertical extends (ITop | IBottom)> = (GHorizontal & GVertical) & {
//   readonly [GKey in Exclude<keyof (ILeft & IRight & ITop & IBottom), keyof (GHorizontal & GVertical)>]?: never;
// }
//
// export type ILeftTop = IComposePositions<ILeft, ITop>;
// export type IRightTop = IComposePositions<IRight, ITop>;
// export type ILeftBottom = IComposePositions<ILeft, IBottom>;
// export type IRightBottom = IComposePositions<IRight, IBottom>;
//
// export type IAllDirectionPosition =
//   | ILeftTop
//   | IRightTop
//   | ILeftBottom
//   | IRightBottom
//   ;
//
// export type IContainerBox = IWidth & IHeight;
// export type IReferenceBox = ILeft & ITop & IWidth & IHeight;
// export type IFloatingBox = IWidth & IHeight;

/*--*/

// export interface IContainerBox {
//   readonly width: number;
// }

/*--*/

export interface IReferenceBoxRelativeToContainer {
  readonly leftRelativeToContainer: number;
  readonly topRelativeToContainer: number;
  readonly widthRelativeToContainer: number;
  readonly heightRelativeToContainer: number;
}

export function createReferenceRelativeToContainerFromDomRects(
  container: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
  reference: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
): IReferenceBoxRelativeToContainer {
  return {
    leftRelativeToContainer: (reference.left - container.left) / container.width,
    topRelativeToContainer: (reference.top - container.top) / container.height,
    widthRelativeToContainer: reference.width / container.width,
    heightRelativeToContainer: reference.height / container.height,
  };
}

export interface IFloatingMinSizeRelativeToContainer {
  readonly minWidthRelativeToContainer: number;
  readonly minHeightRelativeToContainer: number;
}

export function createFloatingMinSizeRelativeToContainerFromDomRect(
  container: Pick<DOMRect, 'width' | 'height'>,
  minSize: { readonly minWidth: number; readonly minHeight: number; },
): IFloatingMinSizeRelativeToContainer {
  return {
    minWidthRelativeToContainer: minSize.minWidth / container.width,
    minHeightRelativeToContainer: minSize.minHeight / container.height,
  };
}

// export interface IReferenceBoxWithMinSizeRelativeToContainer extends IReferenceBoxRelativeToContainer, IFloatingMinSizeRelativeToContainer {
// }

// export function createReferenceBoxWithMinSizeRelativeToContainerFromDomRects(
//   container: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
//   reference: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
//   minSize: { readonly minWidth: number; readonly minHeight: number; },
// ): IReferenceBoxWithMinSizeRelativeToContainer {
//   return {
//     leftRelativeToContainer: (reference.left - container.left) / container.width,
//     topRelativeToContainer: (reference.top - container.top) / container.height,
//     widthRelativeToContainer: reference.width / container.width,
//     heightRelativeToContainer: reference.height / container.height,
//     minWidthRelativeToContainer: minSize.minWidth / container.width,
//     minHeightRelativeToContainer: minSize.minHeight / container.height,
//   };
// }

export interface IPlacedFloating {
  // anchor position relative to the container
  readonly anchorXRelativeToContainer: number;
  readonly anchorYRelativeToContainer: number;
  // anchor position relative to the floating element
  readonly anchorXRelativeToFloating: number;
  readonly anchorYRelativeToFloating: number;
}

export interface IPlaceFloatingFunction {
  (
    reference: IReferenceBoxRelativeToContainer,
    floating: IFloatingMinSizeRelativeToContainer,
  ): IPlacedFloating;
}

export function placeFloatingOnTopStartAndShrinkEnd(
  reference: IReferenceBoxRelativeToContainer,
): IPlacedFloating {
  return {
    anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer),
    anchorYRelativeToContainer: normalize(reference.topRelativeToContainer),
    anchorXRelativeToFloating: 0,
    anchorYRelativeToFloating: 1,
  };
}

export function placeFloatingOnTopStartAndPushEnd(
  reference: IReferenceBoxRelativeToContainer,
  floating: IFloatingMinSizeRelativeToContainer,
): IPlacedFloating {
  return {
    anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer),
    anchorYRelativeToContainer: normalize(reference.topRelativeToContainer),
    anchorXRelativeToFloating: 0,
    anchorYRelativeToFloating: 1,
  };
}

export function placeFloatingOnTopEndAndShrinkStart(
  reference: IReferenceBoxRelativeToContainer,
): IPlacedFloating {
  return {
    anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer + reference.widthRelativeToContainer),
    anchorYRelativeToContainer: normalize(reference.topRelativeToContainer),
    anchorXRelativeToFloating: 1,
    anchorYRelativeToFloating: 1,
  };
}

export function placeFloatingOnBottomStartAndShrinkEnd(
  reference: IReferenceBoxRelativeToContainer,
): IPlacedFloating {
  return {
    anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer),
    anchorYRelativeToContainer: normalize(reference.topRelativeToContainer + reference.heightRelativeToContainer),
    anchorXRelativeToFloating: 0,
    anchorYRelativeToFloating: 0,
  };
}

/*--*/

export interface IAvailableSizeRelativeToContainer {
  readonly availableXRelativeToContainer: number;
  readonly availableYRelativeToContainer: number;
}

export function getPlacedFloatingAvailableSizeRelativeToContainer(
  placedFloating: IPlacedFloating,
): IAvailableSizeRelativeToContainer {
  return {
    // TODO maybe normalize
    availableXRelativeToContainer: (
      ((1 - placedFloating.anchorXRelativeToContainer) * (1 - placedFloating.anchorXRelativeToFloating))
      + (placedFloating.anchorXRelativeToContainer * placedFloating.anchorXRelativeToFloating)
    ),
    availableYRelativeToContainer: (
      ((1 - placedFloating.anchorYRelativeToContainer) * (1 - placedFloating.anchorYRelativeToFloating))
      + (placedFloating.anchorYRelativeToContainer * placedFloating.anchorYRelativeToFloating)
    ),
  };
}

/*--*/

export function getScoreFromAvailableSizeAndMinSize(
  availableSize: IAvailableSizeRelativeToContainer,
  minSize: IFloatingMinSizeRelativeToContainer,
): number {
  return Math.min(availableSize.availableXRelativeToContainer / minSize.minWidthRelativeToContainer, 1)
    * Math.min(availableSize.availableYRelativeToContainer / minSize.minHeightRelativeToContainer, 1);
}

/*--*/

export interface IPlacedFloatingOnBestResult extends IPlacedFloating, IAvailableSizeRelativeToContainer {
  readonly score: number;
  readonly index: number;
}

export function placeFloatingOnBest(
  reference: IReferenceBoxRelativeToContainer,
  floating: IFloatingMinSizeRelativeToContainer,
  placeFloatingFunctions: readonly IPlaceFloatingFunction[],
): IPlacedFloatingOnBestResult {
  let bestPlacedFloating: IPlacedFloatingOnBestResult = {
    anchorXRelativeToContainer: 0,
    anchorYRelativeToContainer: 0,
    anchorXRelativeToFloating: 0,
    anchorYRelativeToFloating: 0,
    availableXRelativeToContainer: 0,
    availableYRelativeToContainer: 0,
    score: -1,
    index: -1,
  };

  for (let index = 0, length = placeFloatingFunctions.length; index < length; index++) {
    const placedFloating: IPlacedFloating = placeFloatingFunctions[index](reference, floating);
    const availableSize: IAvailableSizeRelativeToContainer = getPlacedFloatingAvailableSizeRelativeToContainer(placedFloating);
    const score: number = getScoreFromAvailableSizeAndMinSize(availableSize, floating);

    if (score === 1) {
      return {
        ...placedFloating,
        ...availableSize,
        score,
        index,
      };
    } else {
      if (score > bestPlacedFloating.score) {
        bestPlacedFloating = {
          ...placedFloating,
          ...availableSize,
          score,
          index,
        };
      }
    }
  }

  return bestPlacedFloating;
}

/*--*/

export function convertPlacedFloatingToCssTranslate(
  placedFloating: IPlacedFloating,
  container: Pick<DOMRect, 'width' | 'height'>,
): [string, string] {
  return [
    `calc(${placedFloating.anchorXRelativeToContainer * container.width}px - ${placedFloating.anchorXRelativeToFloating * 100}%)`,
    `calc(${placedFloating.anchorYRelativeToContainer * container.height}px - ${placedFloating.anchorYRelativeToFloating * 100}%)`,
  ];
}

export function convertPlacedFloatingToCssTransformOrigin(
  placedFloating: IPlacedFloating,
): [string, string] {
  return [
    `${placedFloating.anchorXRelativeToFloating * 100}%`,
    `${placedFloating.anchorYRelativeToFloating * 100}%`,
  ];
}

export function convertPlacedFloatingToCssMaxSize(
  availableSize: IAvailableSizeRelativeToContainer,
  container: Pick<DOMRect, 'width' | 'height'>,
): [string, string] {
  return [
    `${availableSize.availableXRelativeToContainer * container.width}px`,
    `${availableSize.availableYRelativeToContainer * container.height}px`,
  ];
}

/*----------*/

// export interface IPosition {
//   readonly left: number;
//   readonly top: number;
// }
//
// export interface IRectangle {
//   readonly width: number;
//   readonly height: number;
// }
//
// export interface IPositionedRectangle extends IPosition, IRectangle {
// }
//
// /* PLACEMENT */
//
// export type IAlignment = 'start' | 'center' | 'end';
//
// export type ISide = 'left' | 'right' | 'top' | 'bottom';
//
// export type IAlignedPlacement = `${ISide}-${IAlignment}`;
//
// export type IPlacement = ISide | IAlignedPlacement;
//
// export type IPlacementOrNone = IPlacement | 'none';

//
// export interface IPlaceFloatingAreaOptions {
//   readonly minWidth?: number;
//   readonly maxWidth?: number;
//   readonly minHeight?: number;
//   readonly maxHeight?: number;
//   readonly placements?: readonly IPlacement[];
// }
//
// export interface IPlacePlaceFloatingAreaResult {
//   readonly placement: IPlacementOrNone;
//   readonly top: number;
//   readonly left: number;
//   readonly minWidth: number;
//   readonly maxWidth: number;
//   readonly minHeight: number;
//   readonly maxHeight: number;
// }
//
// export function placeFloatingArea(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   floating: IRectangle,
//   {
//     minWidth = 0,
//     maxWidth = Number.POSITIVE_INFINITY, // assumes maxWidth >= minWidth
//     minHeight = 0,
//     maxHeight = Number.POSITIVE_INFINITY,
//     placements = ['bottom-start'],
//   }: IPlaceFloatingAreaOptions = {},
// ): IPlacePlaceFloatingAreaResult {
//
//   // let availableLeft: number = Math.max(reference.left - container.left, 0);
//   // let availableRight: number = Math.max(container.left + container.width - reference.left - reference.width, 0);
//   //
//   // let availableTop: number = Math.max(reference.top - container.top, 0);
//   // let availableBottom: number = Math.max(container.top + container.height - reference.top - reference.height, 0);
//   //
//   // console.log(availableTop, availableBottom);
//
//   const options: IGetFloatingAreaScoreOptions = {
//     minWidth,
//     minHeight,
//   };
//
//   const placement: IPlacementOrNone = getFloatingAreaBestPlacement(container, reference, options, placements);
//
//   console.log(placement);
//
//   let left: number = 0;
//   let top: number = 0;
//   let _maxWidth: number = 0;
//   let _maxHeight: number = 0;
//
//   if (placement === 'none') {
//     // nothing to do
//   } else if (placement.startsWith('top')) {
//
//   } else if (placement.startsWith('bottom')) {
//     top = clamp(reference.top + reference.height, 0, container.height);
//     _maxHeight = Math.min(container.height - top, maxHeight);
//
//     if (placement.endsWith('-start')) {
//       left = clamp(reference.left, 0, container.width);
//       _maxWidth = Math.min(container.width - left, maxWidth);
//     } else if (placement.endsWith('-center')) {
//       // TODO continue here
//     } else if (placement.endsWith('-end')) {
//
//     } else {
//
//     }
//   }
//
//   return {
//     placement,
//     top,
//     left,
//     minWidth,
//     minHeight,
//     maxWidth: _maxWidth,
//     maxHeight: _maxHeight,
//   };
// }
//
// /*---------*/
//
// function clamp(
//   value: number,
//   min: number,
//   max: number,
// ): number {
//   return Math.max(min, Math.min(max, value));
// }
//
// function clampScore(
//   score: number,
// ): number {
//   return clamp(score, 0, 1);
// }
//
// /*---*/
//
// export function getFloatingAreaBestPlacement(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
//   placements: readonly IPlacement[],
// ): IPlacementOrNone {
//   const scores: IFloatingAreaScores = getFloatingAreaScores(container, reference, options);
//   let bestPlacement: IPlacementOrNone = 'none';
//   let bestPlacementScore: number = -1;
//
//   for (let i = 0, l = placements.length; i < l; i++) {
//     const placement: IPlacement = placements[i];
//     const score: number = scores[placement];
//     if (score === 1) {
//       return placement;
//     } else {
//       if (score < bestPlacementScore) {
//         bestPlacement = placement;
//         bestPlacementScore = score;
//       }
//     }
//   }
//
//   return bestPlacement;
// }
//
// /*---*/
//
// export interface IGetFloatingAreaScoreOptions {
//   readonly minWidth: number;
//   readonly minHeight: number;
// }
//
// export type IFloatingAreaScores = Record<IPlacement, number>;
//
// export function getFloatingAreaScores(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): IFloatingAreaScores {
//   return {
//     'left': getFloatingAreaLeftScore(container, reference, options),
//     'left-center': getFloatingAreaLeftCenterScore(container, reference, options),
//     'left-start': getFloatingAreaLeftStartScore(container, reference, options),
//     'left-end': getFloatingAreaLeftEndScore(container, reference, options),
//     'right': getFloatingAreaRightScore(container, reference, options),
//     'right-center': getFloatingAreaRightCenterScore(container, reference, options),
//     'right-start': getFloatingAreaRightStartScore(container, reference, options),
//     'right-end': getFloatingAreaRightEndScore(container, reference, options),
//     'top': getFloatingAreaTopScore(container, reference, options),
//     'top-center': getFloatingAreaTopCenterScore(container, reference, options),
//     'top-start': getFloatingAreaTopStartScore(container, reference, options),
//     'top-end': getFloatingAreaTopEndScore(container, reference, options),
//     'bottom': getFloatingAreaBottomScore(container, reference, options),
//     'bottom-center': getFloatingAreaBottomCenterScore(container, reference, options),
//     'bottom-start': getFloatingAreaBottomStartScore(container, reference, options),
//     'bottom-end': getFloatingAreaBottomEndScore(container, reference, options),
//   };
// }
//
// /* LEFT OR RIGHT */
//
// function getFloatingAreaLeftOrRightScoreOnY(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore(container.height / options.minHeight);
// }
//
// function getFloatingAreaLeftOrRightStartScoreOnY(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore((container.height - reference.top) / options.minHeight); // TODO forbid negative values
// }
//
// function getFloatingAreaLeftOrRightCenterScoreOnY(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   const middle: number = reference.top + (reference.height / 2);
//   const halfSize: number = options.minWidth / 2;
//   return (
//     clampScore(middle / halfSize)
//     + clampScore((container.height - middle) / halfSize)
//   ) / 2;
// }
//
// function getFloatingAreaLeftOrRightEndScoreOnY(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore((reference.top + reference.height) / options.minHeight);
// }
//
// /* LEFT */
//
// function getFloatingAreaLeftScoreOnX(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore(reference.left / options.minWidth);
// }
//
// export function getFloatingAreaLeftScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaLeftScoreOnX(container, reference, options)
//     * getFloatingAreaLeftOrRightScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaLeftStartScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaLeftScoreOnX(container, reference, options)
//     * getFloatingAreaLeftOrRightStartScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaLeftCenterScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaLeftScoreOnX(container, reference, options)
//     * getFloatingAreaLeftOrRightCenterScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaLeftEndScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaLeftScoreOnX(container, reference, options)
//     * getFloatingAreaLeftOrRightEndScoreOnY(container, reference, options);
// }
//
// /* RIGHT */
//
// function getFloatingAreaRightScoreOnX(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore((container.width - reference.left - reference.width) / options.minWidth);
// }
//
// export function getFloatingAreaRightScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaRightScoreOnX(container, reference, options)
//     * getFloatingAreaLeftOrRightScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaRightStartScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaRightScoreOnX(container, reference, options)
//     * getFloatingAreaLeftOrRightStartScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaRightCenterScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaRightScoreOnX(container, reference, options)
//     * getFloatingAreaLeftOrRightCenterScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaRightEndScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaRightScoreOnX(container, reference, options)
//     * getFloatingAreaLeftOrRightEndScoreOnY(container, reference, options);
// }
//
// /* TOP OR BOTTOM */
//
// function getFloatingAreaTopOrBottomScoreOnX(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore(container.width / options.minWidth);
// }
//
// function getFloatingAreaTopOrBottomStartScoreOnX(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   // return clampScore((container.width - reference.left) / options.minWidth);
//   return clamp(container.width - reference.left, 0, options.minWidth) / options.minWidth; // DONE
// }
//
// function getFloatingAreaTopOrBottomCenterScoreOnX(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   const middle: number = reference.left + (reference.width / 2);
//   const halfSize: number = options.minHeight / 2;
//   return (
//     clampScore(middle / halfSize)
//     + clampScore((container.width - middle) / halfSize)
//   ) / 2;
// }
//
// function getFloatingAreaTopOrBottomEndScoreOnX(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore((reference.left + reference.width) / options.minWidth);
// }
//
// /* TOP */
//
// function getFloatingAreaTopScoreOnY(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore(reference.top / options.minHeight);
// }
//
// export function getFloatingAreaTopScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaTopOrBottomScoreOnX(container, reference, options)
//     * getFloatingAreaTopScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaTopStartScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaTopOrBottomStartScoreOnX(container, reference, options)
//     * getFloatingAreaTopScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaTopCenterScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaTopOrBottomCenterScoreOnX(container, reference, options)
//     * getFloatingAreaTopScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaTopEndScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaTopOrBottomEndScoreOnX(container, reference, options)
//     * getFloatingAreaTopScoreOnY(container, reference, options);
// }
//
// /* BOTTOM */
//
// function getFloatingAreaBottomScoreOnY(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return clampScore((container.height - reference.top - reference.height) / options.minHeight);
// }
//
// export function getFloatingAreaBottomScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaTopOrBottomScoreOnX(container, reference, options)
//     * getFloatingAreaBottomScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaBottomStartScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaTopOrBottomStartScoreOnX(container, reference, options)
//     * getFloatingAreaBottomScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaBottomCenterScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaTopOrBottomCenterScoreOnX(container, reference, options)
//     * getFloatingAreaBottomScoreOnY(container, reference, options);
// }
//
// export function getFloatingAreaBottomEndScore(
//   container: IRectangle,
//   reference: IPositionedRectangle,
//   options: IGetFloatingAreaScoreOptions,
// ): number {
//   return getFloatingAreaTopOrBottomEndScoreOnX(container, reference, options)
//     * getFloatingAreaBottomScoreOnY(container, reference, options);
// }
//
//
//


