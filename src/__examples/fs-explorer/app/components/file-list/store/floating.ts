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

export interface IPositionRelativeToContainer {
  readonly leftRelativeToContainer: number;
  readonly topRelativeToContainer: number;
}

export interface IPositionRelativeToFloating {
  readonly leftRelativeToFloating: number;
  readonly topRelativeToFloating: number;
}

export interface ISizeRelativeToContainer {
  readonly widthRelativeToContainer: number;
  readonly heightRelativeToContainer: number;
}

export interface IMinSizeRelativeToContainer {
  readonly minWidthRelativeToContainer: number;
  readonly minHeightRelativeToContainer: number;
}

export interface IMaxSizeRelativeToContainer {
  readonly maxWidthRelativeToContainer: number;
  readonly maxHeightRelativeToContainer: number;
}

// export interface IAnchorRelativeToFloating {
//   readonly anchorXRelativeToFloating: number;
//   readonly anchorYRelativeToFloating: number;
// }
//
// export interface IAnchorRelativeToReference {
//   readonly anchorXRelativeToFloating: number;
//   readonly anchorYRelativeToFloating: number;
// }
//
// export interface IAnchorRelativeToContainer {
//   readonly anchorXRelativeToContainer: number;
//   readonly anchorYRelativeToContainer: number;
// }

export type Vec2 = readonly [
  x: number,
  y: number,
];

/*--*/

export interface IReferenceBoxRelativeToContainer extends IPositionRelativeToContainer, ISizeRelativeToContainer {
}

export interface IFloatingMinSizeRelativeToContainer extends IMinSizeRelativeToContainer {

}

export function createReferenceBoxRelativeToContainerFromDomRects(
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

// export interface IPlacedFloating extends //
//   // anchor position relative to the floating element
//   IPositionRelativeToFloating,
//   // anchor position relative to the container
//   IPositionRelativeToContainer,
//   IMaxSizeRelativeToContainer
// //
// {
// }

export interface IRelativePlacedFloating {
  readonly floating: Vec2;
  readonly reference: Vec2;
  readonly container: Vec2;
}

export interface IRelativePlaceFloatingFunction {
  (
    reference: IReferenceBoxRelativeToContainer,
    floating: IFloatingMinSizeRelativeToContainer,
  ): IRelativePlacedFloating;
}

// const TOP_LEFT_RELATIVE_TO_FLOATING: IPositionRelativeToFloating = {
//   leftRelativeToFloating: 0,
//   topRelativeToFloating: 1,
// };
//
// export function placeFloatingOnTopLeftOverflow(
//   reference: IReferenceBoxRelativeToContainer,
// ): IPlacedFloating {
//   return {
//     ...TOP_LEFT_RELATIVE_TO_FLOATING,
//     leftRelativeToContainer: reference.leftRelativeToContainer,
//     topRelativeToContainer: reference.topRelativeToContainer,
//     maxWidthRelativeToContainer: Number.POSITIVE_INFINITY,
//     maxHeightRelativeToContainer: Number.POSITIVE_INFINITY,
//   };
// }
//
// export function placeFloatingOnTopLeftShrink(
//   reference: IReferenceBoxRelativeToContainer,
// ): IPlacedFloating {
//   return {
//     ...TOP_LEFT_RELATIVE_TO_FLOATING,
//     leftRelativeToContainer: reference.leftRelativeToContainer,
//     topRelativeToContainer: reference.topRelativeToContainer,
//     maxWidthRelativeToContainer: Math.max(0, 1 - reference.leftRelativeToContainer),
//     maxHeightRelativeToContainer: Math.max(0, reference.topRelativeToContainer),
//   };
// }
//
// export function placeFloatingOnTopLeftPush(
//   reference: IReferenceBoxRelativeToContainer,
//   floating: IFloatingMinSizeRelativeToContainer,
// ): IPlacedFloating {
//
//   let leftRelativeToContainer: number;
//   let maxWidthRelativeToContainer: number = Math.max(0, 1 - reference.leftRelativeToContainer);
//
//   if (maxWidthRelativeToContainer >= floating.minWidthRelativeToContainer) {
//     leftRelativeToContainer = Math.max(0, reference.leftRelativeToContainer);
//   } else {
//     // not enough available width
//     leftRelativeToContainer = Math.max(0, 1 - floating.minWidthRelativeToContainer);
//     maxWidthRelativeToContainer = Math.min(1, floating.minWidthRelativeToContainer);
//   }
//
//   return {
//     ...TOP_LEFT_RELATIVE_TO_FLOATING,
//     leftRelativeToContainer,
//     topRelativeToContainer: reference.topRelativeToContainer,
//     maxWidthRelativeToContainer,
//     maxHeightRelativeToContainer: Number.POSITIVE_INFINITY,
//   };
// }

export type IPlacementHorizontal = 'left' | 'center' | 'right';
export type IPlacementVertical = 'top' | 'center' | 'bottom';

export type IPlacementMain = 'left' | 'right' | 'top' | 'bottom';

// export type IPlacementLeft = `left-${IPlacementVertical}`;
// export type IPlacementRight = `right-${IPlacementVertical}`;
// export type IPlacementTop = `top-${IPlacementHorizontal}`;
// export type IPlacementBottom = `bottom-${IPlacementHorizontal}`;
//
// export type IPlacement = IPlacementLeft | IPlacementRight | IPlacementTop | IPlacementBottom;

export type IOverflowPush = 'push';
export type IOverflowOverflow = 'overflow';
export type IOverflowShrink = 'shrink';

export type IOverflowPushOverflow = IOverflowPush | IOverflowOverflow;
export type IOverflowPushOverflowShrink = IOverflowPushOverflow | IOverflowShrink;

// export type IOverflowVerticalHorizontal =  `${IOverflowBase}-${IOverflowBase}`;
// export type IOverflowTopRightBottomLeft =  `${IOverflowBase}-${IOverflowBase}-${IOverflowBase}-${IOverflowBase}`;
// export type IOverflow =  IOverflowBase | IOverflowVerticalHorizontal | IOverflowTopRightBottomLeft;

// export type IPlacementWithOverflow = `${IPlacement}-${IOverflow}`;
export type IPlacementWithOverflow =
// | `top-left-${IOverflowPushOverflow}`
// | `top-left-${IOverflowPushOverflow}-${IOverflowPushOverflow}`
  | `top-left-${IOverflowPushOverflowShrink}-${IOverflowPushOverflowShrink}-${IOverflowPushOverflow}-${IOverflowPushOverflow}`
  // | `top-right-${IOverflowPushOverflow}`
  // | `top-right-${IOverflowPushOverflow}-${IOverflowPushOverflow}`
  | `top-right-${IOverflowPushOverflowShrink}-${IOverflowPushOverflow}-${IOverflowPushOverflow}-${IOverflowPushOverflowShrink}`
  | `top-center-${IOverflowPushOverflowShrink}-${IOverflowPushOverflow}-${IOverflowPushOverflow}-${IOverflowPushOverflowShrink}`
  ;

export function abc(
  referencePositionRelativeToContainer: Vec2,
  referenceSizeRelativeToContainer: Vec2,
  floatingMinSizeSizeRelativeToContainer: Vec2,
) {

}

// export interface IDefOptions {
//   readonly anchorPositionRelativeToReference: Vec2;
//   readonly anchorPositionRelativeToFloating: Vec2;
//
//   readonly topOverflow: IOverflowPushOverflowShrink;
//   readonly rightOverflow: IOverflowPushOverflowShrink;
//   readonly bottomOverflow: IOverflowPushOverflowShrink;
//   readonly leftOverflow: IOverflowPushOverflowShrink;
// }
//
// export function def(
//   {
//     anchorPositionRelativeToReference,
//     anchorPositionRelativeToFloating,
//   }: IDefOptions,
//   // anchorPositionRelativeToContainer: Vec2,
//   // referenceSizeRelativeToContainer: Vec2,
//   // floatingMinSizeSizeRelativeToContainer: Vec2,
// ) {
//
// }

export interface IDefOptions {
  readonly anchorPositionRelativeToFloating: Vec2;
  readonly anchorPositionRelativeToContainer: Vec2;
  readonly floatingMinSizeSizeRelativeToContainer: Vec2;

  readonly leftOverflow: IOverflowPushOverflowShrink;
  readonly rightOverflow: IOverflowPushOverflowShrink;
  readonly topOverflow: IOverflowPushOverflowShrink;
  readonly bottomOverflow: IOverflowPushOverflowShrink;
}

export function def(
  {
    anchorPositionRelativeToFloating,
    anchorPositionRelativeToContainer,
    floatingMinSizeSizeRelativeToContainer,
    topOverflow,
    rightOverflow,
    bottomOverflow,
    leftOverflow,
  }: IDefOptions,
  // anchorPositionRelativeToContainer: Vec2,
  // referenceSizeRelativeToContainer: Vec2,
  // floatingMinSizeSizeRelativeToContainer: Vec2,
) {
  let anchorXPositionRelativeToContainer: number;
  let anchorYPositionRelativeToContainer: number;
  let floatingMaxWidthRelativeToContainer: number;
  let floatingMaxHeightRelativeToContainer: number;

  if (leftOverflow === 'overflow') {
    if (rightOverflow === 'overflow') {
      floatingMaxWidthRelativeToContainer = Number.POSITIVE_INFINITY;
      anchorXPositionRelativeToContainer = anchorPositionRelativeToContainer[0];
    } else if (rightOverflow === 'shrink') {

    }
  }

  console.log(
    anchorXPositionRelativeToContainer,
    floatingMaxWidthRelativeToContainer,
  );

}

export function b(
  anchorPositionRelativeToFloating: number,
  [availableStart, availableEnd]: Vec2,
): number {
  return Math.min(
    availableStart,
    (
      (anchorPositionRelativeToFloating === 1)
      || !Number.isFinite(availableEnd)
    )
      ? Number.POSITIVE_INFINITY
      : (availableEnd * (1 + anchorPositionRelativeToFloating)) / (1 - anchorPositionRelativeToFloating),
  );
}

export function a(
  anchorPositionRelativeToFloating: number,
  [availableStart, availableEnd]: Vec2,
): Vec2 {
  return [
    b(anchorPositionRelativeToFloating, [availableStart, availableEnd]),
    b(-anchorPositionRelativeToFloating, [availableEnd, availableStart]),
  ];
}

export interface IGhiOptions {
  readonly anchorPositionRelativeToFloating: number;
  readonly anchorPositionRelativeToContainer: number;
  readonly floatingMinSizeRelativeToContainer: number;

  readonly startOverflow: IOverflowPushOverflow;
  readonly endOverflow: IOverflowPushOverflow;
}

// TODO continue here
export function ghi(
  {
    anchorPositionRelativeToFloating,
    anchorPositionRelativeToContainer,
    floatingMinSizeRelativeToContainer,
    startOverflow,
    endOverflow,
  }: IGhiOptions,
) {
  let floatingMaxSizeRelativeToContainer: number;

  const startLimit: number = (startOverflow === 'overflow')
    ? Number.NEGATIVE_INFINITY
    : -1;
  const endLimit: number = (endOverflow === 'overflow')
    ? Number.POSITIVE_INFINITY
    : 1;

  const availableStart: number = anchorPositionRelativeToContainer - startLimit;
  const availableEnd: number = endLimit - anchorPositionRelativeToContainer;

  // relative to container with anchor as starting point
  const [balancedAvailableStart, balancedAvailableEnd] = a(
    anchorPositionRelativeToFloating,
    [
      availableStart,
      availableEnd,
    ],
  );

  console.log(balancedAvailableStart, balancedAvailableEnd);

  if (startOverflow === 'overflow') {
    if (endOverflow === 'overflow') {
      floatingMaxSizeRelativeToContainer = Number.POSITIVE_INFINITY;
    } else if (endOverflow === 'push') {

    }
  } else if (startOverflow === 'push') {

    if (balancedAvailableStart + balancedAvailableEnd < floatingMinSizeRelativeToContainer) { // need to push

    }

    // anchorPositionRelativeToContainer = Math.min(
    //   Math.max(
    //     reference.leftRelativeToContainer + (reference.widthRelativeToContainer * leftRelativeToFloating),
    //     floating.minWidthRelativeToContainer * leftRelativeToFloating,
    //   ),
    //   floating.minWidthRelativeToContainer * (leftRelativeToFloating - 1) + 1,
    // );
  }


  console.log(
    anchorPositionRelativeToContainer,
    floatingMaxSizeRelativeToContainer,
  );

  // console.log(
  //   anchorPositionRelativeToContainer,
  //   floatingMaxSizeRelativeToContainer,
  // );

}

export function placeFloating(
  placement: IPlacementWithOverflow,
): IPlaceFloatingFunction {

  const [mainPlacement, crossPlacement, ...overflows] = placement.split('-') as [IPlacementMain, IPlacementHorizontal | IPlacementVertical, ...IOverflowBase[]];

  let topOverflow: IOverflowPushOverflowShrink;
  let rightOverflow: IOverflowPushOverflowShrink;
  let bottomOverflow: IOverflowPushOverflowShrink;
  let leftOverflow: IOverflowPushOverflowShrink;

  if (overflows.length === 1) {
    topOverflow = rightOverflow = bottomOverflow = leftOverflow = overflows[0];
  } else if (overflows.length === 2) {
    topOverflow = bottomOverflow = overflows[0];
    rightOverflow = leftOverflow = overflows[1];
  } else if (overflows.length === 4) {
    topOverflow = overflows[0];
    rightOverflow = overflows[1];
    bottomOverflow = overflows[2];
    leftOverflow = overflows[3];
  } else {
    throw new Error(`Invalid overflows`);
  }

  const invalidOverflow = (name: string): never => {
    throw new Error(`Invalid overflow value in "${placement}" for ${name}`);
  };

  return (
    reference: IReferenceBoxRelativeToContainer,
    floating: IFloatingMinSizeRelativeToContainer,
  ): IPlacedFloating => {
    let leftRelativeToFloating!: number;
    let topRelativeToFloating: number;
    let leftRelativeToReference: number; // TODO
    let topRelativeToReference: number;
    let leftRelativeToContainer: number;
    let topRelativeToContainer: number;
    let maxWidthRelativeToContainer: number;
    let maxHeightRelativeToContainer: number;

    if (mainPlacement === 'top') {
      topRelativeToFloating = 1;

      if (crossPlacement === 'left') {
        leftRelativeToFloating = 0;
      }

      if (crossPlacement === 'right') {
        leftRelativeToFloating = 1;
      }

      if (crossPlacement === 'center') {
        leftRelativeToFloating = 0.5;
        // leftRelativeToFloating = -1;
        // leftRelativeToFloating = 0;
      }

      // vertical
      if (topOverflow === 'push') {
        if (bottomOverflow === 'push') {
          topRelativeToContainer = Math.min(Math.max(reference.topRelativeToContainer, floating.minHeightRelativeToContainer), 1);
          maxHeightRelativeToContainer = topRelativeToContainer;
        } else if (bottomOverflow === 'overflow') {
          topRelativeToContainer = Math.max(reference.topRelativeToContainer, floating.minHeightRelativeToContainer);
          maxHeightRelativeToContainer = Number.POSITIVE_INFINITY;
        } else {
          invalidOverflow('bottom');
        }
      } else if (topOverflow === 'overflow') {
        if (bottomOverflow === 'push') {
          topRelativeToContainer = Math.min(reference.topRelativeToContainer, 1);
          maxHeightRelativeToContainer = Number.POSITIVE_INFINITY;
        } else if (bottomOverflow === 'overflow') {
          topRelativeToContainer = reference.topRelativeToContainer;
          maxHeightRelativeToContainer = Number.POSITIVE_INFINITY;
        } else {
          invalidOverflow('bottom');
        }
      } else if (topOverflow === 'shrink') {
        if (bottomOverflow === 'push') {
          topRelativeToContainer = Math.min(reference.topRelativeToContainer, 1);
          maxHeightRelativeToContainer = topRelativeToContainer;
        } else if (bottomOverflow === 'overflow') {
          topRelativeToContainer = reference.topRelativeToContainer;
          maxHeightRelativeToContainer = topRelativeToContainer;
        } else {
          invalidOverflow('bottom');
        }
      } else {
        invalidOverflow('top');
      }

      // horizontal
      if (leftOverflow === 'push') {
        if (rightOverflow === 'push') {
          // left
          // leftRelativeToContainer = Math.min(Math.max(reference.leftRelativeToContainer, 0), 1 - floating.minWidthRelativeToContainer);
          // maxWidthRelativeToContainer = 1 - leftRelativeToContainer;

          // right
          // leftRelativeToContainer = Math.min(Math.max(reference.leftRelativeToContainer + reference.widthRelativeToContainer, floating.minWidthRelativeToContainer), 1);
          // maxWidthRelativeToContainer = leftRelativeToContainer;

          leftRelativeToContainer = Math.min(
            Math.max(
              reference.leftRelativeToContainer + (reference.widthRelativeToContainer * leftRelativeToFloating),
              floating.minWidthRelativeToContainer * leftRelativeToFloating,
            ),
            floating.minWidthRelativeToContainer * (leftRelativeToFloating - 1) + 1,
          );

          const availableLeft: number = leftRelativeToContainer;
          const availableRight: number = (1 - leftRelativeToContainer);

          const virtualLeft: number = (leftRelativeToFloating === 1)
            ? Number.POSITIVE_INFINITY
            : (availableRight * leftRelativeToFloating) / (1 - leftRelativeToFloating);

          const virtualRight: number = (leftRelativeToFloating === 0)
            ? Number.POSITIVE_INFINITY
            : (availableLeft * (1 - leftRelativeToFloating)) / leftRelativeToFloating;

          console.log(virtualLeft, virtualRight);

          maxWidthRelativeToContainer = Math.min(virtualLeft, availableLeft)
            + Math.min(virtualRight, availableRight);

        } else if (rightOverflow === 'overflow') {
          leftRelativeToContainer = Math.max(reference.leftRelativeToContainer, 0);
          maxWidthRelativeToContainer = Number.POSITIVE_INFINITY;
        } else if (rightOverflow === 'shrink') {
          leftRelativeToContainer = Math.min(Math.max(reference.leftRelativeToContainer, 0), 1);
          maxWidthRelativeToContainer = 1 - leftRelativeToContainer;
        } else {
          invalidOverflow('right');
        }
      } else if (leftOverflow === 'overflow') {
        if (rightOverflow === 'push') {
          leftRelativeToContainer = Math.min(reference.leftRelativeToContainer, 1 - floating.minWidthRelativeToContainer);
          maxWidthRelativeToContainer = 1 - leftRelativeToContainer;
        } else if (rightOverflow === 'overflow') {
          leftRelativeToContainer = reference.leftRelativeToContainer;
          maxWidthRelativeToContainer = Number.POSITIVE_INFINITY;
        } else if (rightOverflow === 'shrink') {
          leftRelativeToContainer = Math.min(reference.leftRelativeToContainer, 1);
          maxWidthRelativeToContainer = 1 - leftRelativeToContainer;
        } else {
          invalidOverflow('right');
        }
      } else {
        invalidOverflow('left');
      }
    }

    return {
      leftRelativeToFloating,
      topRelativeToFloating,
      leftRelativeToContainer,
      topRelativeToContainer,
      maxWidthRelativeToContainer,
      maxHeightRelativeToContainer,
    };
  };
}

// export function placeFloatingOnTopLeftPushShrink(
//   reference: IReferenceBoxRelativeToContainer,
// ): IPlacedFloating {
//   return {
//     anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer),
//     anchorYRelativeToContainer: reference.topRelativeToContainer,
//     anchorXRelativeToFloating: 0,
//     anchorYRelativeToFloating: 1,
//     maxWidthRelativeToContainer: Number.POSITIVE_INFINITY,
//     maxHeightRelativeToContainer: Number.POSITIVE_INFINITY,
//   };
// }

// export function placeFloatingOnTopLeftShrink(
//   reference: IReferenceBoxRelativeToContainer,
// ): IPlacedFloating {
//   return {
//     anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer),
//     anchorYRelativeToContainer: normalize(reference.topRelativeToContainer),
//     anchorXRelativeToFloating: 0,
//     anchorYRelativeToFloating: 1,
//   };
// }

// export function placeFloatingOnTopLeftAndPushEnd(
//   reference: IReferenceBoxRelativeToContainer,
//   floating: IFloatingMinSizeRelativeToContainer,
// ): IPlacedFloating {
//   return {
//     anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer),
//     anchorYRelativeToContainer: normalize(reference.topRelativeToContainer),
//     anchorXRelativeToFloating: 0,
//     anchorYRelativeToFloating: 1,
//   };
// }
//
// export function placeFloatingOnTopRightAndShrinkStart(
//   reference: IReferenceBoxRelativeToContainer,
// ): IPlacedFloating {
//   return {
//     anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer + reference.widthRelativeToContainer),
//     anchorYRelativeToContainer: normalize(reference.topRelativeToContainer),
//     anchorXRelativeToFloating: 1,
//     anchorYRelativeToFloating: 1,
//   };
// }
//
// export function placeFloatingOnBottomLeftAndShrinkEnd(
//   reference: IReferenceBoxRelativeToContainer,
// ): IPlacedFloating {
//   return {
//     anchorXRelativeToContainer: normalize(reference.leftRelativeToContainer),
//     anchorYRelativeToContainer: normalize(reference.topRelativeToContainer + reference.heightRelativeToContainer),
//     anchorXRelativeToFloating: 0,
//     anchorYRelativeToFloating: 0,
//   };
// }

/*--*/

// export interface IAvailableSizeRelativeToContainer {
//   readonly availableXRelativeToContainer: number;
//   readonly availableYRelativeToContainer: number;
// }

// export function getPlacedFloatingAvailableSizeRelativeToContainer(
//   placedFloating: IPlacedFloating,
// ): IAvailableSizeRelativeToContainer {
//   return {
//     availableXRelativeToContainer: (
//       ((1 - placedFloating.anchorXRelativeToContainer) * (1 - placedFloating.anchorXRelativeToFloating))
//       + (placedFloating.anchorXRelativeToContainer * placedFloating.anchorXRelativeToFloating)
//     ),
//     availableYRelativeToContainer: (
//       ((1 - placedFloating.anchorYRelativeToContainer) * (1 - placedFloating.anchorYRelativeToFloating))
//       + (placedFloating.anchorYRelativeToContainer * placedFloating.anchorYRelativeToFloating)
//     ),
//   };
// }

/*--*/

export function getPlacedFloatingScore(
  placeFloating: Pick<IPlacedFloating, 'maxWidthRelativeToContainer' | 'maxHeightRelativeToContainer'>,
  minSize: IMinSizeRelativeToContainer,
): number {
  return normalize(placeFloating.maxWidthRelativeToContainer / minSize.minWidthRelativeToContainer)
    * normalize(placeFloating.maxHeightRelativeToContainer / minSize.minHeightRelativeToContainer);
}

/*--*/

export interface IPlacedFloatingOnBestResult extends IPlacedFloating {
  readonly score: number;
  readonly index: number;
}

export function placeFloatingOnBest(
  reference: IReferenceBoxRelativeToContainer,
  floating: IFloatingMinSizeRelativeToContainer,
  placeFloatingFunctions: readonly IPlaceFloatingFunction[],
): IPlacedFloatingOnBestResult {
  let bestPlacedFloating: IPlacedFloatingOnBestResult = {
    leftRelativeToContainer: 0,
    topRelativeToContainer: 0,
    leftRelativeToFloating: 0,
    topRelativeToFloating: 0,
    maxWidthRelativeToContainer: 0,
    maxHeightRelativeToContainer: 0,

    score: -1,
    index: -1,
  };

  for (let index = 0, length = placeFloatingFunctions.length; index < length; index++) {
    const placedFloating: IPlacedFloating = placeFloatingFunctions[index](reference, floating);
    const score: number = getPlacedFloatingScore(placedFloating, floating);

    if (score === 1) {
      return {
        ...placedFloating,
        score,
        index,
      };
    } else {
      if (score > bestPlacedFloating.score) {
        bestPlacedFloating = {
          ...placedFloating,
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
    `calc(${placedFloating.leftRelativeToContainer * container.width}px - ${placedFloating.leftRelativeToFloating * 100}%)`,
    // `${placedFloating.leftRelativeToContainer * container.width}px`,
    `calc(${placedFloating.topRelativeToContainer * container.height}px - ${placedFloating.topRelativeToFloating * 100}%)`,
  ];
}

export function convertPlacedFloatingToCssTransformOrigin(
  placedFloating: IPlacedFloating,
): [string, string] {
  return [
    `${placedFloating.leftRelativeToFloating * 100}%`,
    `${placedFloating.topRelativeToFloating * 100}%`,
  ];
}

export function convertPlacedFloatingToCssMaxSize(
  maxSize: IMaxSizeRelativeToContainer,
  container: Pick<DOMRect, 'width' | 'height'>,
): [string, string] {
  return [
    Number.isFinite(maxSize.maxWidthRelativeToContainer)
      ? `${maxSize.maxWidthRelativeToContainer * container.width}px`
      : 'none',
    Number.isFinite(maxSize.maxHeightRelativeToContainer)
      ? `${maxSize.maxHeightRelativeToContainer * container.height}px`
      : 'none',
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


