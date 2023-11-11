import {
  map$$,
  IObservable,
  signal,
  computed,
  fromEventTarget,
  fromSelfEventTarget,
  merge,
  reference,
  combineLatestSpread, share$$, filter$$,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  IClassNamesList,
  VirtualComponentNode,
  Input,
  Output,
  Component,
  input,
  output,
  toStylePropertiesMap, VirtualElementNode,
} from '@lirx/dom';
import { NodeReferenceModifier } from '@lirx/dom-material';

// @ts-ignore
import html from './file-list.component.html?raw';
// @ts-ignore
import style from './file-list.component.scss?inline';
import {
  IPosition,
  getPointerEventPosition,
  getHTMLElementScrollPosition,
  getHTMLElementArea,
  IArea,
  getHTMLElementAreaRelativeToParent, areAreaIntersecting,
} from './store/area';
import { setSymmetricDifference } from '../../../misc/set-operations';
import {
  IStylePropertiesMap,
} from '@lirx/dom/src/dom-manipulation/virtual-nodes/virtual-reactive-element-node/members/style/style-properties-map.type';
import { IUnsubscribe } from '@lirx/unsubscribe';
import { createGoogleDriveFileSystem } from '../../../uni-fs/google-drive/create-google-drive-file-system';
import { GOOGLE_API_CONFIGURATION } from '../../../api/google/google-api-configuration.constant.private';
import { Abortable, AsyncTask, IAsyncTaskFactory } from '@lirx/async-task';
import { IFileSystemEntryWithMetadata } from '@uni-fs/core';
import { IGoogleDriveFileSystemMetadata } from '../../../uni-fs/google-drive/shared/google-drive-file-system.metadata.type';
import { getFilePreviewURL } from '../../../misc/get-file-preview-url-from-mimetype';

/** TYPES **/

export type IAppFileListCardComponentView =
  | 'card'
  | 'table'
  ;

export interface IFileEntry {
  readonly name: string;
  readonly previewURL: string;
  readonly size: string;
  readonly modified: string;
}

export type IFileList = readonly IFileEntry[];

export type ISelectedFiles = ReadonlySet<IFileEntry>;

/**
 * COMPONENT: 'app-file-list'
 */

interface IAppFileListComponentData {
  readonly files: Input<IFileList>;
  readonly view: Input<IAppFileListCardComponentView>;
  readonly selectedFiles: Output<ISelectedFiles>;
}

interface ITemplateData {
  readonly onKeyDownFilesContainer: (event: KeyboardEvent) => void;
  readonly onPointerDownFilesContainer: (event: PointerEvent) => void;
  readonly files$: IObservable<IFileList>;
  readonly setFileElement: (file: IFileEntry, element: HTMLElement) => void;
  readonly isFileSelected$$: (file: IFileEntry) => IObservable<boolean>;
  // readonly setFilesContainerElement: (node: VirtualElementNode<HTMLElement>) => void;
  // readonly setFileElement: (node: VirtualElementNode<HTMLElement>, file: IFileEntry, index$: IObservable<number>) => void;
}

export const AppFileListComponent = new Component<HTMLElement, IAppFileListComponentData, ITemplateData>({
  name: 'app-file-list',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [],
    modifiers: [
      NodeReferenceModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IAppFileListComponentData => ({
    files: input<IFileList>([]),
    view: input<IAppFileListCardComponentView>('card'),
    selectedFiles: output<ISelectedFiles>(),
  }),
  templateData: (node: VirtualComponentNode<HTMLElement, IAppFileListComponentData>): ITemplateData => {
    /* VIEW */

    const view$ = node.input$('view');

    const classNames$ = map$$(view$, (view: IAppFileListCardComponentView): IClassNamesList => {
      return new Set<string>([
        `view-${view}`,
      ]);
    });

    node.setReactiveClassNamesList(classNames$);

    /* FILES */

    const dummyFiles = Array.from({ length: 100 }, (_, index: number): IFileEntry => {
      return {
        // id: String(index),
        name: `file-${index}.txt`,
        // previewURL: `/assets/images/0${Math.floor(Math.random() * 3 + 1)}.jpg`,
        previewURL: `/assets/images/10.jpg`,
        size: '5KB',
        modified: 'Today',
      };
    });

    // const fs = createGoogleDriveFileSystem(GOOGLE_API_CONFIGURATION);
    //
    // fs.list({
    //   uri: 'google-drive:',
    //   abortable: Abortable.never,
    //   withMetadata: true,
    // })
    //   .successful((entries: readonly IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>[], abortable: Abortable) => {
    //     return AsyncTask.all(
    //       entries.map((entry: IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>): IAsyncTaskFactory<IFileEntry> => {
    //         return (abortable: Abortable): AsyncTask<IFileEntry> => {
    //           return getFilePreviewURL({
    //             previewURL: entry.metadata!.thumbnailLink,
    //             mimeType: entry.metadata!.mimeType,
    //             types: entry.metadata!.types,
    //             abortable,
    //           })
    //             .successful((previewURL: string): IFileEntry => {
    //               return {
    //                 name: entry.metadata!.name,
    //                 previewURL,
    //                 size: String(entry.metadata!.size),
    //                 modified: 'Today',
    //               };
    //             })
    //         }
    //       }),
    //       abortable
    //     );
    //   })
    //   .successful((_files: IFileEntry[]): void => {
    //     files.set(_files);
    //   });

    const files = signal(dummyFiles);
    const selectedFiles = signal(new Set<IFileEntry>());
    const currentFileIndex = signal(-1);

    const fileToElementMap = new WeakMap<IFileEntry, HTMLElement>();

    const setFileElement = (
      file: IFileEntry,
      element: HTMLElement,
    ): void => {
      fileToElementMap.set(file, element);
    };

    const getFileElement = (
      file: IFileEntry,
    ): HTMLElement => {
      const element: HTMLElement | undefined = fileToElementMap.get(file);
      if (element === void 0) {
        throw new Error(`Missing element for this file`);
      } else {
        return element;
      }
    };

    const isFileSelected$$ = (
      file: IFileEntry,
    ): IObservable<boolean> => {
      return computed((): boolean => {
        return selectedFiles().has(file);
      }).toObservable();
    };

    /* KEYBOARD EVENTS */

    const onKeyDownFilesContainer = (
      event: KeyboardEvent,
    ): void => {
      if (
        event.ctrlKey
        && (event.key === 'a')
      ) {
        event.preventDefault();
        selectedFiles.set(new Set<IFileEntry>(files()));
      }
    };

    /* POINTER EVENTS */

    // select area

    const selectArea = signal<IArea | null>(null);

    const toPx = (value: number): string => {
      return `${value}px`;
    };

    const selectAreaVisible = computed((): boolean => {
      return selectArea() !== null;
    });

    node.setReactiveStylePropertiesMap(
      map$$(selectArea.toObservable(), (area: IArea | null): IStylePropertiesMap => {
        return toStylePropertiesMap(
          (area === null)
            ? {}
            : {
              '--app-file-list-select-area-left': toPx(area.left),
              '--app-file-list-select-area-top': toPx(area.top),
              '--app-file-list-select-area-width': toPx(area.width),
              '--app-file-list-select-area-height': toPx(area.height),
            },
        );
      }),
    );

    node.setReactiveClass('select-area-visible', selectAreaVisible.toObservable());

    const windowPointerMove$ = fromEventTarget<'pointermove', PointerEvent>(window, 'pointermove');
    const windowPointerUp$ = fromEventTarget<'pointerup', PointerEvent>(window, 'pointerup');

    const windowPointerEvent$ = merge([
      windowPointerMove$,
      windowPointerUp$,
    ]);

    const windowPointerPosition$ = share$$(map$$(windowPointerEvent$, getPointerEventPosition));

    const onPointerDownFilesContainer = (
      event: PointerEvent,
    ): void => {
      if ((event.target as HTMLElement).classList.contains('files-container')) {

        const container: HTMLElement = event.currentTarget as HTMLElement;

        if (event.button === 0) {
          event.preventDefault();
          container.focus();

          const getContainerScrollPosition = (): IPosition => {
            return getHTMLElementScrollPosition(container);
          };

          const initialPointerPosition: IPosition = getPointerEventPosition(event);
          const initialContainerScrollPosition: IPosition = getContainerScrollPosition();
          const containerArea: IArea = getHTMLElementArea(container);

          currentFileIndex.set(-1);

          const onScrollContainer$ = fromSelfEventTarget<'scroll', Event>(container, 'scroll');

          const containerScrollPosition$ = merge([
            reference(getContainerScrollPosition),
            map$$(
              onScrollContainer$,
              getContainerScrollPosition,
            ),
          ]);

          let updateSelectedFiles: (newSelectedFiles: Set<IFileEntry>) => void;

          if (event.ctrlKey) {
            const initialSelectedFiles: Set<IFileEntry> = selectedFiles();

            updateSelectedFiles = (newSelectedFiles: Set<IFileEntry>): void => {
              selectedFiles.set(setSymmetricDifference(newSelectedFiles, initialSelectedFiles));
            };
          } else {
            updateSelectedFiles = (newSelectedFiles: Set<IFileEntry>): void => {
              selectedFiles.set(newSelectedFiles);
            };
          }

          let _unsubscribeOfCurrentPositions: IUnsubscribe | undefined;

          const unsubscribeOfCurrentPositions = (): void => {
            if (_unsubscribeOfCurrentPositions !== void 0) {
              _unsubscribeOfCurrentPositions();
              _unsubscribeOfCurrentPositions = void 0;
            }
          };

          let _unsubscribeOfWindowPointerUp: IUnsubscribe | undefined;

          const unsubscribeOfWindowPointerUp = (): void => {
            if (_unsubscribeOfWindowPointerUp !== void 0) {
              _unsubscribeOfWindowPointerUp();
              _unsubscribeOfWindowPointerUp = void 0;
            }
          };

          const currentPositions$ = combineLatestSpread(windowPointerPosition$, containerScrollPosition$);

          _unsubscribeOfCurrentPositions = currentPositions$(
            ([
               currentPointerPosition,
               currentContainerScrollPosition,
             ]: readonly [IPosition, IPosition],
            ): void => {

              const x0: number = initialPointerPosition.left + initialContainerScrollPosition.left - containerArea.left;
              const y0: number = initialPointerPosition.top + initialContainerScrollPosition.top - containerArea.top;

              const x1: number = currentPointerPosition.left + currentContainerScrollPosition.left - containerArea.left;
              const y1: number = currentPointerPosition.top + currentContainerScrollPosition.top - containerArea.top;

              let left: number;
              let top: number;
              let width: number;
              let height: number;

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

              // includes the container scroll
              const containerSelectArea: IArea = {
                left,
                top,
                width,
                height,
              };

              // does not include the container scroll
              const absoluteSelectArea: IArea = {
                left: left - currentContainerScrollPosition.left,
                top: top - currentContainerScrollPosition.top,
                width,
                height,
              };

              selectArea.set(absoluteSelectArea);

              const newSelectedFiles: Set<IFileEntry> = new Set<IFileEntry>();

              const _files: IFileEntry[] = files();

              for (let i = 0, l = _files.length; i < l; i++) {
                const file: IFileEntry = _files[i];
                const element: HTMLElement = getFileElement(file);
                const elementArea: IArea = getHTMLElementAreaRelativeToParent(element);
                if (areAreaIntersecting(containerSelectArea, elementArea)) {
                  newSelectedFiles.add(file);
                }
              }

              updateSelectedFiles(newSelectedFiles);
            },
          );

          _unsubscribeOfWindowPointerUp = windowPointerUp$(() => {
            unsubscribeOfCurrentPositions();
            unsubscribeOfWindowPointerUp();
            selectArea.set(null);
          });
        }
      }
    };

    return {
      onKeyDownFilesContainer,
      onPointerDownFilesContainer,

      files$: files.toObservable(),
      setFileElement,
      isFileSelected$$,
    };
  },
});
