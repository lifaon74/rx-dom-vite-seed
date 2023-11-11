import {
  fromSelfEventTarget,
  filter$$,
  IObservable,
  fromEventTarget,
  IObserver,
  PureComputedSignal,
  takeUntil$$,
  first$$,
  reference,
  merge,
  map$$,
  PureSignal, IPureReadonlySignal, effect, switchMap$$,
} from '@lirx/core';
import { IUnsubscribe, mergeUnsubscribeFunctions } from '@lirx/unsubscribe';
import { setSymmetricDifference } from '../../../../misc/set-operations';
import { noop } from '@lirx/utils';

/** FUNCTIONS **/

/* POSITION */

type IPosition = [
  x: number,
  y: number,
];

function getElementScrollPosition(
  element: HTMLElement,
): IPosition {
  return [
    element.scrollLeft,
    element.scrollTop,
  ];
}

function getMousePosition(
  event: MouseEvent,
): IPosition {
  return [
    event.clientX,
    event.clientY,
  ];
}

function getElementPosition(
  element: HTMLElement,
): IPosition {
  const { left, top } = element.getBoundingClientRect();
  return [left, top];
}

function isPrimaryPointerButton(
  event: MouseEvent,
): boolean {
  return event.button === 0;
}

function isPointerOnElementContent(
  event: MouseEvent,
  element: HTMLElement,
): boolean {
  const { left: xe, top: ye } = element.getBoundingClientRect();
  const xp: number = event.clientX;
  const yp: number = event.clientY;
  const we: number = element.clientWidth;
  const he: number = element.clientHeight;
  return (
    ((xe <= xp) && (xp <= (xe + we)))
    && ((ye <= yp) && (yp <= (ye + he)))
  );
}

const pointerDownWindow$ = fromEventTarget<'pointerdown', PointerEvent>(window, 'pointerdown');
const pointerMoveWindow$ = fromEventTarget<'pointermove', PointerEvent>(window, 'pointermove');
const pointerUpWindow$ = fromEventTarget<'pointerup', PointerEvent>(window, 'pointerup');

/** CLASS **/

export class HTMLElementListController {
  // readonly #container: PureSignal<HTMLElement>;
  readonly #elements: PureSignal<readonly HTMLElement[]>;
  readonly #selectedElements: PureSignal<ReadonlySet<HTMLElement>>;
  readonly #currentElement: PureSignal<HTMLElement | undefined>;

  constructor() {
    // this.#container = new PureSignal<HTMLElement>(document.body);
    this.#elements = new PureSignal<readonly HTMLElement[]>([]);
    this.#selectedElements = new PureSignal<ReadonlySet<HTMLElement>>(new Set<HTMLElement>());
    this.#currentElement = new PureSignal<HTMLElement | undefined>(void 0);

    this.#elements.toObservable({ debounce: false, emitCurrentValue: false })((elements: readonly HTMLElement[]): void => {
      const currentElement: HTMLElement | undefined = this.#currentElement.get();
      if (
        (currentElement !== void 0)
        && !elements.includes(currentElement)
      ) {
        this.deselectAllElements();
      }
    });
  }

  // get container(): PureSignal<HTMLElement> {
  //   return this.#container;
  // }

  get elements(): PureSignal<readonly HTMLElement[]> {
    return this.#elements;
  }

  get selectedElements(): IPureReadonlySignal<ReadonlySet<HTMLElement>> {
    return this.#selectedElements;
  }

  /* SELECT */

  #getAllElementsBetweenTwoIndexes(
    a: number,
    b: number,
  ): HTMLElement[] {
    if (a > b) {
      [a, b] = [b, a];
    }
    return this.#elements.get().slice(a, b + 1);
  };

  #getAllElementsBetweenTwoElements(
    a: HTMLElement,
    b: HTMLElement,
  ): HTMLElement[] {
    return this.#getAllElementsBetweenTwoIndexes(
      this.#elements.get().indexOf(a),
      this.#elements.get().indexOf(b),
    );
  };

  selectAllElements(): void {
    this.#selectedElements.set(
      new Set<HTMLElement>(this.#elements.get()),
    );
    this.#currentElement.set(void 0);
  }

  selectElement(
    element: HTMLElement,
    append: boolean,
  ): void {
    if (append) {
      this.#selectedElements.mutate<Set<HTMLElement>>((selectedElements: Set<HTMLElement>): void => {
        selectedElements.add(element);
      });
    } else {
      this.#selectedElements.set(
        new Set<HTMLElement>([element]),
      );
    }
    this.#currentElement.set(element);
  }

  selectElementsBetweenCurrentSelectedElementAndAnotherElement(
    element: HTMLElement,
    append: boolean,
  ): void {
    const currentElement: HTMLElement | undefined = this.#currentElement.get();

    if (currentElement === void 0) {
      this.selectElement(element, false);
    } else {
      const selectedElements: HTMLElement[] = this.#getAllElementsBetweenTwoElements(currentElement, element);

      this.#selectedElements.set(
        new Set(
          append
            ? [
              ...this.#selectedElements.get(),
              ...selectedElements,
            ]
            : selectedElements,
        ),
      );
    }
  }

  deselectAllElements(): void {
    this.#selectedElements.set(new Set<HTMLElement>());
    this.#currentElement.set(void 0);
  }

  deselectElement(
    element: HTMLElement,
  ): void {
    this.#selectedElements.mutate<Set<HTMLElement>>((selectedElements: Set<HTMLElement>): void => {
      selectedElements.delete(element);
    });
    this.#currentElement.set(void 0);
  }

  isElementSelected(
    element: HTMLElement,
  ): PureComputedSignal<boolean> {
    return new PureComputedSignal<boolean>((): boolean => {
      return this.#selectedElements.get().has(element);
    });
  }

  // startPointerSelectAreaListener(
  //   container: HTMLElement,
  // ): IUnsubscribe {
  //   const pointerDownContainer$ = filter$$(
  //     fromSelfEventTarget<'pointerdown', PointerEvent>(container, 'pointerdown'),
  //     (event: PointerEvent): boolean => {
  //       return isPrimaryPointerButton(event)
  //         && isPointerOnElementContent(event, container);
  //     },
  //   );
  //
  //   const getContainerScrollPosition = (): IPosition => {
  //     return getElementScrollPosition(container);
  //   };
  //
  //   const scrollContainer$ = fromSelfEventTarget<'scroll', Event>(container, 'scroll');
  //
  //   const scrollContainerPosition$ = merge([
  //     reference(getContainerScrollPosition),
  //     map$$(
  //       scrollContainer$,
  //       getContainerScrollPosition,
  //     ),
  //   ]);
  //
  //   let _unsubscribeOfCurrentPositions: IUnsubscribe | undefined;
  //
  //   const unsubscribeOfCurrentPositions = (): void => {
  //     if (_unsubscribeOfCurrentPositions !== void 0) {
  //       _unsubscribeOfCurrentPositions();
  //       _unsubscribeOfCurrentPositions = void 0;
  //     }
  //   };
  //
  //   let _unsubscribeOfPointerUpWindow: IUnsubscribe | undefined;
  //
  //   const unsubscribeOfPointerUpWindow = (): void => {
  //     if (_unsubscribeOfPointerUpWindow !== void 0) {
  //       _unsubscribeOfPointerUpWindow();
  //       _unsubscribeOfPointerUpWindow = void 0;
  //     }
  //   };
  //
  //   const unsubscribeOfPointerDownContainer = pointerDownContainer$((event: PointerEvent): void => {
  //     event.preventDefault();
  //     container.focus();
  //
  //     const initialPointerPosition: IPosition = getMousePosition(event);
  //     const initialScrollPosition: IPosition = getContainerScrollPosition();
  //     const initialElementPosition: IPosition = getElementPosition(container);
  //
  //     this.#currentFileId.set(void 0);
  //
  //     let onCurrentPositionChange: IObserver<ISelectedFileIds>;
  //
  //     if (event.ctrlKey) {
  //       const initialSelectedElements: ISelectedFileIds = this.#selectedFileIds.get();
  //
  //       onCurrentPositionChange = (selectedElements: ISelectedFileIds): void => {
  //         this.#selectedFileIds.set(setSymmetricDifference(selectedElements, initialSelectedElements));
  //       };
  //     } else {
  //       onCurrentPositionChange = (selectedElements: ISelectedFileIds): void => {
  //         this.#selectedFileIds.set(selectedElements);
  //       };
  //     }
  //
  //     const currentPositions$ = combineLatestSpread(pointerWindowPosition$, scrollContainerPosition$);
  //
  //     _unsubscribeOfCurrentPositions = currentPositions$(
  //       ([
  //          currentPointerPosition,
  //          currentScrollPosition,
  //        ]: readonly [IPosition, IPosition],
  //       ): void => {
  //         const pointerSelectArea: IPointerSelectArea = computePointerSelectArea(
  //           initialPointerPosition,
  //           initialScrollPosition,
  //           initialElementPosition,
  //           currentPointerPosition,
  //           currentScrollPosition,
  //         );
  //
  //         $pointerSelectArea(pointerSelectArea);
  //
  //         const selectedElements: ISelectedFileIds = computeSelectedElementsFromPointerSelectArea(
  //           files,
  //           pointerSelectArea,
  //         );
  //
  //         onCurrentPositionChange(selectedElements);
  //       },
  //     );
  //
  //     _unsubscribeOfPointerUpWindow = pointerUpWindow$(() => {
  //       unsubscribeOfCurrentPositions();
  //       unsubscribeOfPointerUpWindow();
  //       $pointerSelectArea(null);
  //     });
  //   });
  //
  //   return (): void => {
  //     unsubscribeOfPointerDownContainer();
  //     unsubscribeOfCurrentPositions();
  //     unsubscribeOfPointerUpWindow();
  //   };
  // }
}

export abstract class HTMLElementListSubController {

}

export class HTMLElementListKeyboardController {
  readonly #mainController: HTMLElementListController;
  readonly #container: HTMLElement;

  constructor(
    mainController: HTMLElementListController,
    container: HTMLElement,
  ) {
    this.#mainController = mainController;
    this.#container = container;
  }

  start(): IUnsubscribe {
    const ctrlA$ = filter$$(
      fromSelfEventTarget<'keydown', KeyboardEvent>(this.#container, 'keydown'),
      (event: KeyboardEvent): boolean => {
        return event.ctrlKey
          && (event.key === 'a');
      },
    );

    return ctrlA$((event: KeyboardEvent): void => {
      event.preventDefault();
      this.#mainController.selectAllElements();
    });
  }
}

export class HTMLElementListPointerDownElementController {
  readonly #mainController: HTMLElementListController;

  constructor(
    mainController: HTMLElementListController,
  ) {
    this.#mainController = mainController;
  }

  startForElement(
    element: HTMLElement,
  ): IUnsubscribe {
    const pointerDownFile$ = filter$$(
      fromEventTarget<'pointerdown', PointerEvent>(element, 'pointerdown'),
      isPrimaryPointerButton,
    );
    const dragStartFile$ = fromEventTarget<'dragstart', Event>(element, 'dragstart');

    const selectThisFile = (): void => {
      this.#mainController.selectElement(element, false);
    };

    const selectFileRange = (): void => {
      this.#mainController.selectElementsBetweenCurrentSelectedElementAndAnotherElement(element, false);
    };

    const deselectThisFile = (): void => {
      this.#mainController.deselectElement(element);
    };

    const appendThisFile = (): void => {
      this.#mainController.selectElement(element, true);
    };

    const appendFileRange = (): void => {
      this.#mainController.selectElementsBetweenCurrentSelectedElementAndAnotherElement(element, true);
    };

    const pointerUpUntilDrag$ = takeUntil$$(first$$(pointerUpWindow$), first$$(dragStartFile$));

    let _unsubscribeOfPointerUpUntilDrag: IUnsubscribe | undefined;

    const unsubscribeOfPointerUpUntilDrag = (): void => {
      if (_unsubscribeOfPointerUpUntilDrag !== void 0) {
        _unsubscribeOfPointerUpUntilDrag();
        _unsubscribeOfPointerUpUntilDrag = void 0;
      }
    };

    const unsubscribeOfPointerDownFile = pointerDownFile$((event: PointerEvent): void => {
      unsubscribeOfPointerUpUntilDrag();
      const selectedElements: ReadonlySet<HTMLElement> = this.#mainController.selectedElements.get();

      // fs.read(new URL(fileId), new Uint8Array(1e6), { start: 0, end: 5 })($log); // TODO

      if (selectedElements.has(element)) {
        _unsubscribeOfPointerUpUntilDrag = pointerUpUntilDrag$((event: PointerEvent): void => {
          unsubscribeOfPointerUpUntilDrag();
          if (event.ctrlKey) {
            deselectThisFile();
          } else {
            if (event.shiftKey) {
              selectFileRange();
            } else {
              selectThisFile();
            }
          }
        });
      } else {
        if (event.ctrlKey) {
          if (event.shiftKey) {
            appendFileRange();
          } else {
            appendThisFile();
          }
        } else {
          if (event.shiftKey) {
            selectFileRange();
          } else {
            selectThisFile();
          }
        }
      }
    });

    return (): void => {
      unsubscribeOfPointerDownFile();
      unsubscribeOfPointerUpUntilDrag();
    };
  }

  // // TODO optimize
  // start(): IUnsubscribe {
  //   return switchMap$$(this.#mainController.elements.toObservable(), (elements: readonly HTMLElement[]): IObservable<never> => {
  //     return (): IUnsubscribe => {
  //       return mergeUnsubscribeFunctions(
  //         elements.map((element: HTMLElement): IUnsubscribe => {
  //           return this.startForElement(element);
  //         }),
  //       );
  //     };
  //   })(noop);
  // }
}

