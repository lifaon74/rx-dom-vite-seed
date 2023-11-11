/* COMPARE */

function compareFileSystemTypes(
  a: IFileSystemTypesSet,
  b: IFileSystemTypesSet,
): number {
  if (a.has('directory')) {
    return b.has('directory')
      ? 0
      : -1;
  } else {
    return b.has('directory')
      ? 1
      : 0;
  }
}

function compareFileSystemEntryTypes(
  a: IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>,
  b: IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>,
): number {
  return compareFileSystemTypes(a.metadata!.types, b.metadata!.types);
}

function compareFileSystemEntryNames(
  a: IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>,
  b: IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>,
): number {
  return compareStringsInsensitive(a.metadata!.name, b.metadata!.name);
}

const compareFileSystemEntry = sequenceCompareFunctions([
  compareFileSystemEntryTypes,
  compareFileSystemEntryNames,
]);

/* SELECT FILES */

type IFileIdWithElement = [
  fileId: string,
  fileElement: HTMLElement,
];

type IFileIdWithElementList = readonly IFileIdWithElement[];

export interface ICreateFileSelectorOptions {
  readonly container: HTMLElement;
  readonly files: IFileIdWithElementList;
  readonly $pointerSelectArea$: IMulticastReplayLastSource<IPointerSelectAreaOrNull>;
  readonly $selectedFiles$: IMulticastReplayLastSource<ISelectedFileIds>;
  readonly $currentFileIndex$: IMulticastReplayLastSource<number>;
}

interface ICreateFileSelectorResult {
  selectedFiles$: IObservable<ISelectedFileIds>;
  pointerSelectArea$: IObservable<IPointerSelectAreaOrNull>;
  destroy: IUnsubscribe;
}

function createFileSelector(
  container: HTMLElement,
  files: readonly IFileIdWithElement[],
): ICreateFileSelectorResult {
  const $pointerSelectArea$ = createMulticastReplayLastSource<IPointerSelectAreaOrNull>(null);
  const $selectedFiles$ = createMulticastReplayLastSource<ISelectedFileIds>(new Set<string>());
  const $currentFileIndex$ = createMulticastReplayLastSource<number>(-1);

  // KEYBOARD
  const unsubscribeOfKeyBoardFileSelector = createKeyBoardFileSelector({
    container,
    files,
    $selectedFiles$,
    $currentFileIndex$,
  });

  // CLICK FILE
  const unsubscribeOfClickFileFileSelector = createClickFileFileSelector({
    files,
    $selectedFiles$,
    $currentFileIndex$,
  });

  // POINTER SELECT AREA
  const unsubscribeOfPointerSelectAreaFileSelector = createPointerSelectAreaFileSelector({
    container,
    files,
    $pointerSelectArea$,
    $selectedFiles$,
    $currentFileIndex$,
  });

  const destroy = (): void => {
    unsubscribeOfKeyBoardFileSelector();
    unsubscribeOfClickFileFileSelector();
    unsubscribeOfPointerSelectAreaFileSelector();
  };

  return {
    selectedFiles$: $selectedFiles$.subscribe,
    pointerSelectArea$: $pointerSelectArea$.subscribe,
    destroy,
  };
}

/*--*/

export interface ICreateKeyBoardFileSelectorOptions extends Pick<ICreateFileSelectorOptions, 'container' | 'files' | '$selectedFiles$' | '$currentFileIndex$'> {
}

function createKeyBoardFileSelector(
  {
    container,
    files,
    $selectedFiles$: {
      emit: $selectedFiles,
    },
    $currentFileIndex$: {
      emit: $currentFileIndex,
    },
  }: ICreateKeyBoardFileSelectorOptions,
): IUnsubscribe {
  const keyDownContainer$ = fromSelfEventTarget<'keydown', KeyboardEvent>(container, 'keydown');

  const ctrlA$ = filter$$(keyDownContainer$, (event: KeyboardEvent): boolean => {
    return event.ctrlKey
      && (event.key === 'a');
  });

  return ctrlA$((event: KeyboardEvent): void => {
    event.preventDefault();
    $selectedFiles(
      new Set(
        files.map(([fileId]) => fileId),
      ),
    );
    $currentFileIndex(-1);
  });
}

/*--*/

export interface ICreateClickFileFileSelectorOptions extends Pick<ICreateFileSelectorOptions, 'files' | '$selectedFiles$' | '$currentFileIndex$'> {
}

function createClickFileFileSelector(
  {
    files,
    $selectedFiles$: {
      emit: $selectedFiles,
      getValue: getSelectedFiles,
    },
    $currentFileIndex$: {
      emit: $currentFileIndex,
      getValue: getCurrentFileIndex,
    },
  }: ICreateClickFileFileSelectorOptions,
): IUnsubscribe {
  const getFilesBetweenIndexes = (
    a: number,
    b: number,
  ): string[] => {
    if (a > b) {
      [a, b] = [b, a];
    }

    const output: string[] = [];

    for (let i = a; i <= b; i++) {
      output.push(files[i][0]);
    }

    return output;
  };

  return mergeUnsubscribeFunctions(
    files.map(([fileId, fileElement]: IFileIdWithElement, index: number): IUnsubscribe => {
      const pointerDownFile$ = filter$$(
        fromEventTarget<'pointerdown', PointerEvent>(fileElement, 'pointerdown'),
        isPrimaryPointerButton,
      );
      const dragStartFile$ = fromEventTarget<'dragstart', Event>(fileElement, 'dragstart');

      const selectThisFile = (): void => {
        $selectedFiles(new Set([fileId]));
        $currentFileIndex(index);
      };

      const selectFileRange = (): void => {
        if (getCurrentFileIndex() === -1) {
          selectThisFile();
        } else {
          $selectedFiles(
            new Set(getFilesBetweenIndexes(getCurrentFileIndex(), index)),
          );
        }
      };

      const deselectThisFile = () => {
        const newSelectedFiles = new Set(getSelectedFiles());
        newSelectedFiles.delete(fileId);
        $selectedFiles(newSelectedFiles);
        $currentFileIndex(-1);
      };

      const appendThisFile = (): void => {
        $selectedFiles(
          new Set([
            ...getSelectedFiles(),
            fileId,
          ]),
        );
        $currentFileIndex(index);
      };

      const appendFileRange = (): void => {
        if (getCurrentFileIndex() === -1) {
          selectThisFile();
        } else {
          $selectedFiles(
            new Set([
              ...getSelectedFiles(),
              ...getFilesBetweenIndexes(getCurrentFileIndex(), index),
            ]),
          );
        }
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
        const selectedFiles: ISelectedFileIds = getSelectedFiles();

        // fs.read(new URL(fileId), new Uint8Array(1e6), { start: 0, end: 5 })($log); // TODO

        if (selectedFiles.has(fileId)) {
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

      return () => {
        unsubscribeOfPointerDownFile();
        unsubscribeOfPointerUpUntilDrag();
      };
    }),
  );
}

/*--*/

export interface ICreatePointerSelectAreaFileSelectorOptions extends Pick<ICreateFileSelectorOptions, 'container' | 'files' | '$pointerSelectArea$' | '$selectedFiles$' | '$currentFileIndex$'> {
}

function createPointerSelectAreaFileSelector(
  {
    container,
    files,
    $pointerSelectArea$: {
      emit: $pointerSelectArea,
    },
    $selectedFiles$: {
      emit: $selectedFiles,
      getValue: getSelectedFiles,
    },
    $currentFileIndex$: {
      emit: $currentFileIndex,
    },
  }: ICreatePointerSelectAreaFileSelectorOptions,
): IUnsubscribe {
  const pointerDownContainer$ = filter$$(
    fromSelfEventTarget<'pointerdown', PointerEvent>(container, 'pointerdown'),
    (event: PointerEvent): boolean => {
      return isPrimaryPointerButton(event)
        && isPointerOnElementContent(event, container);
    },
  );

  const getContainerScrollPosition = (): IPosition => {
    return getElementScrollPosition(container);
  };

  const scrollContainer$ = fromSelfEventTarget<'scroll', Event>(container, 'scroll');

  const scrollContainerPosition$ = merge([
    reference(getContainerScrollPosition),
    map$$(
      scrollContainer$,
      getContainerScrollPosition,
    ),
  ]);

  let _unsubscribeOfCurrentPositions: IUnsubscribe | undefined;

  const unsubscribeOfCurrentPositions = (): void => {
    if (_unsubscribeOfCurrentPositions !== void 0) {
      _unsubscribeOfCurrentPositions();
      _unsubscribeOfCurrentPositions = void 0;
    }
  };

  let _unsubscribeOfPointerUpWindow: IUnsubscribe | undefined;

  const unsubscribeOfPointerUpWindow = (): void => {
    if (_unsubscribeOfPointerUpWindow !== void 0) {
      _unsubscribeOfPointerUpWindow();
      _unsubscribeOfPointerUpWindow = void 0;
    }
  };

  const unsubscribeOfPointerDownContainer = pointerDownContainer$((event: PointerEvent): void => {
    event.preventDefault();
    container.focus();

    const initialPointerPosition: IPosition = getMousePosition(event);
    const initialScrollPosition: IPosition = getContainerScrollPosition();
    const initialElementPosition: IPosition = getElementPosition(container);

    $currentFileIndex(-1);

    let onCurrentPositionChange: IObserver<ISelectedFileIds>;

    if (event.ctrlKey) {
      const initialSelectedFiles: ISelectedFileIds = getSelectedFiles();

      onCurrentPositionChange = (selectedFiles: ISelectedFileIds): void => {
        $selectedFiles(setSymmetricDifference(selectedFiles, initialSelectedFiles));
      };
    } else {
      onCurrentPositionChange = (selectedFiles: ISelectedFileIds): void => {
        $selectedFiles(selectedFiles);
      };
    }

    const currentPositions$ = combineLatestSpread(pointerWindowPosition$, scrollContainerPosition$);

    _unsubscribeOfCurrentPositions = currentPositions$(
      ([
         currentPointerPosition,
         currentScrollPosition,
       ]: readonly [IPosition, IPosition],
      ): void => {
        const pointerSelectArea: IPointerSelectArea = computePointerSelectArea(
          initialPointerPosition,
          initialScrollPosition,
          initialElementPosition,
          currentPointerPosition,
          currentScrollPosition,
        );

        $pointerSelectArea(pointerSelectArea);

        const selectedFiles: ISelectedFileIds = computeSelectedFilesFromPointerSelectArea(
          files,
          pointerSelectArea,
        );

        onCurrentPositionChange(selectedFiles);
      },
    );

    _unsubscribeOfPointerUpWindow = pointerUpWindow$(() => {
      unsubscribeOfCurrentPositions();
      unsubscribeOfPointerUpWindow();
      $pointerSelectArea(null);
    });
  });

  return (): void => {
    unsubscribeOfPointerDownContainer();
    unsubscribeOfCurrentPositions();
    unsubscribeOfPointerUpWindow();
  };
}

// function createKeyBoardFileSelector(
//   {
//     container,
//     files,
//     $selectedFiles$,
//   }: ICreateFileSelectorOptions,
// ): IUnsubscribe {
//   return createEventListener<'keydown', KeyboardEvent>(container, 'keydown', (event: KeyboardEvent): void => {
//     if (
//       event.ctrlKey
//       && (event.key === 'a')
//     ) {
//       $selectedFiles$.emit(
//         new Set(
//           files.map(([fileId]) => fileId),
//         ),
//       );
//     }
//   });
// }

/*--*/

function fileToFileIdWithElement$$(
  file: IFileEntryExtended,
): IObservable<IFileIdWithElement> {
  return map$$(file.$reference$.subscribe, (reference: VirtualElementNode<HTMLElement>): IFileIdWithElement => {
    return [
      file.id,
      reference.elementNode,
    ];
  });
}

function fileListToFileIdWithElementList$$(
  files: readonly IFileEntryExtended[],
): IObservable<readonly IFileIdWithElement[]> {
  return combineLatest(
    files.map(fileToFileIdWithElement$$),
  );
}

function fileListObservableToFileIdWithElementList$$(
  files$: IObservable<IFilesListExtended>,
): IObservable<readonly IFileIdWithElement[]> {
  return switchMap$$(files$, fileListToFileIdWithElementList$$);
}

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

// const pointerMoveWindowThrottled$ = throttleTime$$(pointerMoveWindow$, 200);

const pointerEventWindow$ = merge([
  pointerDownWindow$,
  pointerMoveWindow$,
  // pointerMoveWindowThrottled$,
  pointerUpWindow$,
]);

const pointerWindowPosition$ = share$$(map$$(pointerEventWindow$, getMousePosition));

/* POINTER SELECT AREA */

interface IPointerSelectArea {
  left: number;
  top: number;
  width: number;
  height: number;
  absoluteLeft: number;
  absoluteTop: number;
}

type IPointerSelectAreaOrNull = IPointerSelectArea | null;

/*--*/

function computePointerSelectArea(
  [xpi, ypi]: IPosition, // initial pointer position
  [xsi, ysi]: IPosition, // initial scroll position
  [xe, ye]: IPosition, // element position
  [xpc, ypc]: IPosition, // current pointer position
  [xsc, ysc]: IPosition, // current scroll position
): IPointerSelectArea {
  const [x0, y0] = [
    xpi + xsi - xe,
    ypi + ysi - ye,
  ];

  const [x1, y1] = [
    xpc + xsc - xe,
    ypc + ysc - ye,
  ];

  let left: number;
  let top: number;
  let width: number;
  let height: number;
  let absoluteLeft: number;
  let absoluteTop: number;

  if (x0 <= x1) {
    left = x0;
    width = x1 - x0;
  } else {
    left = x1;
    width = x0 - x1;
  }
  if (y0 <= y1) {
    top = y0;
    height = y1 - y0;
  } else {
    top = y1;
    height = y0 - y1;
  }

  absoluteLeft = left - xsc;
  absoluteTop = top - ysc;

  return {
    left,
    top,
    width,
    height,
    absoluteLeft,
    absoluteTop,
  };
}

function computeSelectedFilesFromPointerSelectArea(
  files: IFileIdWithElementList,
  {
    left,
    top,
    width,
    height,
  }: IPointerSelectArea,
): ISelectedFileIds {
  const selectedFiles = new Set<string>();

  // console.time('compute');
  for (let i = 0, l = files.length; i < l; i++) {
    const [fileId, element]: IFileIdWithElement = files[i];

    const elementLeft = element.offsetLeft;
    const elementWidth = element.offsetWidth;
    const elementRight = elementLeft + elementWidth;

    const elementTop = element.offsetTop;
    const elementHeight = element.offsetHeight;
    const elementBottom = elementTop + elementHeight;

    if (
      (elementRight >= left)
      && (elementLeft <= (left + width))
      && (elementBottom >= top)
      && (elementTop <= (top + height))
    ) {
      selectedFiles.add(fileId);
    }
  }
  // console.timeEnd('compute');

  return selectedFiles;
}

/*--*/

// interface IGetSelectedFilesFromPointerSelectArea$$Options {
//   readonly files: IFileIdWithElementList;
//   readonly pointerSelectArea$: IObservable<IPointerSelectAreaOrNull>;
// }
//
// function getSelectedFilesFromPointerSelectArea$$(
//   {
//     files,
//     pointerSelectArea$,
//   }: IGetSelectedFilesFromPointerSelectArea$$Options,
// ): IObservable<ISelectedFiles> {
//   const selectAreaNonNull$ = filter$$<IPointerSelectAreaOrNull, IPointerSelectArea>(pointerSelectArea$, (value: IPointerSelectAreaOrNull): value is IPointerSelectArea => (value !== null));
//
//   return map$$(
//     throttleTime$$(selectAreaNonNull$, 200),
//     (
//       selectArea: IPointerSelectArea,
//     ): ISelectedFiles => {
//       return computeSelectedFilesFromPointerSelectArea(files, selectArea);
//     },
//   );
// }

/*--*/

function extractStylePropertyFromPointerSelectArea$$(
  onSelectAreaChange$: IObservable<IPointerSelectAreaOrNull>,
  propertyName: keyof IPointerSelectArea,
): IObservable<ISetStylePropertyOrNull> {
  return pipe$$(onSelectAreaChange$, [
    debounceFrame$$$(),
    map$$$((value: IPointerSelectAreaOrNull): ISetStylePropertyOrNull => {
      return (value === null)
        ? null
        : {
          value: `${value[propertyName]}px`,
        };
    }),
  ]);
}

type IGetPointerSelectAreaObservablesResultDataKeys =
  | 'pointerSelectAreaVisible$'
  | 'pointerSelectAreaStyleLeft$'
  | 'pointerSelectAreaStyleTop$'
  | 'pointerSelectAreaStyleWidth$'
  | 'pointerSelectAreaStyleHeight$'
  ;

interface IGetPointerSelectAreaObservablesResult extends Pick<ITemplateData, IGetPointerSelectAreaObservablesResultDataKeys> {
}

function getPointerSelectAreaObservables(
  pointerSelectArea$: IObservable<IPointerSelectAreaOrNull>,
): IGetPointerSelectAreaObservablesResult {
  const pointerSelectAreaVisible$ = map$$(pointerSelectArea$, _ => (_ !== null));
  const pointerSelectAreaStyleLeft$ = extractStylePropertyFromPointerSelectArea$$(pointerSelectArea$, 'absoluteLeft');
  const pointerSelectAreaStyleTop$ = extractStylePropertyFromPointerSelectArea$$(pointerSelectArea$, 'absoluteTop');
  const pointerSelectAreaStyleWidth$ = extractStylePropertyFromPointerSelectArea$$(pointerSelectArea$, 'width');
  const pointerSelectAreaStyleHeight$ = extractStylePropertyFromPointerSelectArea$$(pointerSelectArea$, 'height');

  return {
    pointerSelectAreaVisible$,
    pointerSelectAreaStyleLeft$,
    pointerSelectAreaStyleTop$,
    pointerSelectAreaStyleWidth$,
    pointerSelectAreaStyleHeight$,
  };
}


