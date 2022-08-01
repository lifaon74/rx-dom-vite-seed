import {
  $log,
  combineLatest,
  combineLatestSpread,
  debounceFrame$$$,
  filter$$,
  first$$,
  fromEventTarget,
  fromSelfEventTarget,
  function$$,
  IMulticastReplayLastSource,
  IObservable,
  IObserver,
  IUnsubscribe,
  let$$,
  map$$,
  map$$$,
  merge,
  mergeUnsubscribeFunctions,
  notificationsToLastValueObservable,
  notificationsToValuesObservable,
  pipe$$,
  reference,
  share$$,
  shareRL$$,
  shareRL$$$,
  switchMap$$,
  switchMap$$$,
  takeUntil$$,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  IClassNamesList,
  ISetStylePropertyOrNull,
  VirtualCustomElementNode,
  VirtualElementNode,
} from '@lirx/dom';
import { IFileSystemEntryWithMetadata, IFileSystemTypesSet } from '@uni-fs/core';
import { NODE_REFERENCE_MODIFIER } from '../../../../material/modifiers/node-reference.modifier';
import { GOOGLE_API_CONFIGURATION } from '../../../api/google/google-api-configuration.constant';
import { chainCompareFunctions } from '../../../misc/comparison/chain-compare-functions';
import { compareStringsInsensitive } from '../../../misc/comparison/compare-strings';
import { generateFilePreviewURL } from '../../../misc/get-file-preview-url-from-mimetype';
import { setSymmetricDifference } from '../../../misc/set-operations';
import { IGoogleDriveFileSystemMetadata } from '../../../uni-fs/google-drive/core/metadata/google-drive-file-system.metadata.type';
import { createGoogleDriveFileSystem } from '../../../uni-fs/google-drive/create-google-drive-file-system';

// TODO
const fs = createGoogleDriveFileSystem(GOOGLE_API_CONFIGURATION);

// @ts-ignore
import html from './files-list.component.html?raw';
// @ts-ignore
import style from './files-list.component.scss?inline';

export type IAppFilesListCardComponentView =
  | 'card'
  | 'table'
  ;

export interface IFileEntry {
  readonly id: string;
  readonly name: string;
  readonly previewURL: string;
  readonly size: string;
  readonly modified: string;
}

export type IFilesList = readonly IFileEntry[];

export interface IFileEntryExtended extends IFileEntry {
  readonly $reference$: IMulticastReplayLastSource<VirtualElementNode<HTMLElement>>;
}

export type IFilesListExtended = readonly IFileEntryExtended[];

type ISelectedFiles = Set<string>;

/**
 * COMPONENT: 'app-files-list'
 */

interface IData {
  readonly $filesContainer: IObserver<VirtualElementNode<HTMLElement>>;
  readonly files$: IObservable<IFilesListExtended>;
  readonly isFileSelected$$: (id: string) => IObservable<boolean>;
  readonly pointerSelectAreaVisible$: IObservable<boolean>;
  readonly pointerSelectAreaStyleLeft$: IObservable<ISetStylePropertyOrNull>;
  readonly pointerSelectAreaStyleTop$: IObservable<ISetStylePropertyOrNull>;
  readonly pointerSelectAreaStyleWidth$: IObservable<ISetStylePropertyOrNull>;
  readonly pointerSelectAreaStyleHeight$: IObservable<ISetStylePropertyOrNull>;
}

interface IAppFilesListComponentConfig {
  element: HTMLElement;
  inputs: [
    ['files', IFilesList],
    ['view', IAppFilesListCardComponentView],
  ];
  outputs: [
    ['selectedFiles', ReadonlySet<IFileEntry>],
  ];
  data: IData;
}

export const AppFilesListComponent = createComponent<IAppFilesListComponentConfig>({
  name: 'app-files-list',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [],
    modifiers: [
      NODE_REFERENCE_MODIFIER,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['files', []],
    ['view', 'card'],
    // ['view', 'table'],
  ],
  outputs: [
    'selectedFiles',
  ],
  init: (node: VirtualCustomElementNode<IAppFilesListComponentConfig>): IData => {
    const dummyFiles = Array.from({ length: 100 }, (_, index: number): IFileEntry => {
      return {
        id: String(index),
        name: `file-${index}.txt`,
        previewURL: `/assets/images/0${Math.floor(Math.random() * 3 + 1)}.jpg`,
        size: '5KB',
        modified: 'Today',
      };
    });

    // const { emit: $files, subscribe: files$ } = let$$<IFilesList>(dummyFiles);

    const childrenWithMetadata$ = notificationsToValuesObservable(fs.list(new URL('google-drive://'), { withMetadata: true }));

    const files$ = switchMap$$(childrenWithMetadata$, (files: IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>[]): IObservable<IFilesList> => {
        return combineLatest(
          files
            .sort(compareFileSystemEntry)
            .map((file: IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>): IObservable<IFileEntry> => {
              const metadata: IGoogleDriveFileSystemMetadata = file.metadata!;
              const previewURL$ = generateFilePreviewURL({
                mimeType: metadata.mimeType,
                previewURL: metadata.thumbnailLink,
                types: metadata.types,
              });

              return map$$(notificationsToLastValueObservable(previewURL$), (previewURL: string): IFileEntry => {
                return {
                  id: file.url.href,
                  name: metadata.name,
                  previewURL,
                  size: '1o',
                  modified: '1o',
                };
              });
            }),
        );
      },
    );

    const { emit: $filesContainer, subscribe: filesContainer$ } = let$$<VirtualElementNode<HTMLElement>>();

    // FILE CONTAINER

    const fileContainerElement$ = map$$(filesContainer$, (filesContainer: VirtualElementNode<HTMLElement>): HTMLElement => {
      return filesContainer.elementNode;
    });

    // VIEW
    const view$ = node.inputs.get$('view');

    const classNames$ = map$$(view$, (view: IAppFilesListCardComponentView): IClassNamesList => {
      return new Set<string>([
        `view-${view}`,
      ]);
    });

    node.setReactiveClassNamesList(classNames$);

    // FILES

    const filesExtended$ = pipe$$(files$, [
      map$$$<IFilesList, IFilesListExtended>((files: IFilesList): IFilesListExtended => {
        return files.map((file: IFileEntry): IFileEntryExtended => {
          return {
            ...file,
            $reference$: let$$<VirtualElementNode<HTMLElement>>(),
          };
        });
      }),
      shareRL$$$<IFilesListExtended>(),
    ]);

    const fileSelector$ = shareRL$$(
      function$$(
        [fileContainerElement$, fileListObservableToFileIdWithElementList$$(filesExtended$)],
        createFileSelector,
      ),
    );

    const selectedFiles$ = pipe$$(fileSelector$, [
      switchMap$$$<ICreateFileSelectorResult, ISelectedFiles>(({ selectedFiles$ }): IObservable<ISelectedFiles> => selectedFiles$),
      shareRL$$$<ISelectedFiles>(),
    ]);

    const pointerSelectArea$ = pipe$$(fileSelector$, [
      switchMap$$$<ICreateFileSelectorResult, IPointerSelectAreaOrNull>(({ pointerSelectArea$ }): IObservable<IPointerSelectAreaOrNull> => pointerSelectArea$),
      shareRL$$$<IPointerSelectAreaOrNull>(),
    ]);

    const isFileSelected$$ = (id: string): IObservable<boolean> => {
      return pipe$$(selectedFiles$, [
        // debounceFrame$$$(),
        // throttleTime$$$(50),
        map$$$((selectedFiles: ISelectedFiles): boolean => {
          return selectedFiles.has(id);
        }),
      ]);
    };

    const {
      pointerSelectAreaVisible$,
      pointerSelectAreaStyleLeft$,
      pointerSelectAreaStyleTop$,
      pointerSelectAreaStyleWidth$,
      pointerSelectAreaStyleHeight$,
    } = getPointerSelectAreaObservables(pointerSelectArea$);

    return {
      $filesContainer,
      files$: filesExtended$,
      isFileSelected$$,
      pointerSelectAreaVisible$,
      pointerSelectAreaStyleLeft$,
      pointerSelectAreaStyleTop$,
      pointerSelectAreaStyleWidth$,
      pointerSelectAreaStyleHeight$,
    };
  },
});

/*-----------------------------------------------------*/

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

const compareFileSystemEntry = chainCompareFunctions([
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
  readonly $selectedFiles$: IMulticastReplayLastSource<ISelectedFiles>;
  readonly $currentFileIndex$: IMulticastReplayLastSource<number>;
}

interface ICreateFileSelectorResult {
  selectedFiles$: IObservable<ISelectedFiles>;
  pointerSelectArea$: IObservable<IPointerSelectAreaOrNull>;
  destroy: IUnsubscribe;
}

function createFileSelector(
  container: HTMLElement,
  files: readonly IFileIdWithElement[],
): ICreateFileSelectorResult {
  const $pointerSelectArea$ = let$$<IPointerSelectAreaOrNull>(null);
  const $selectedFiles$ = let$$<ISelectedFiles>(new Set<string>());
  const $currentFileIndex$ = let$$<number>(-1);

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
        const selectedFiles: ISelectedFiles = getSelectedFiles();


        fs.read(new URL(fileId), new Uint8Array(1e6), { start: 0, end: 5})($log); // TODO

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

    let onCurrentPositionChange: IObserver<ISelectedFiles>;

    if (event.ctrlKey) {
      const initialSelectedFiles: ISelectedFiles = getSelectedFiles();

      onCurrentPositionChange = (selectedFiles: ISelectedFiles): void => {
        $selectedFiles(setSymmetricDifference(selectedFiles, initialSelectedFiles));
      };
    } else {
      onCurrentPositionChange = (selectedFiles: ISelectedFiles): void => {
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

        const selectedFiles: ISelectedFiles = computeSelectedFilesFromPointerSelectArea(
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
): ISelectedFiles {
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

interface IGetPointerSelectAreaObservablesResult extends Pick<IData, IGetPointerSelectAreaObservablesResultDataKeys> {
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


