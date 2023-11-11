import { fromEventTarget, IObserver, map$$, signal, effect, computed, IReadonlySignal, IObservable } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  virtualDOMNodeQuerySelectorOrThrow,
  VirtualReactiveElementNode,
  Output,
  Component,
  output,
  IClassNamesList,
  SignalInput,
  signalInput,
} from '@lirx/dom';
import { ElementReferenceModifier } from '@lirx/dom-material';
import { IconSwapVerticalComponent } from '@lirx/mdi';
import {
  LocalStorageKeyValueDatabase,
  SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE,
} from '../../../../../../../helpers/key-value-database/local-storage-key-value-database';
import { IUnsubscribe } from '@lirx/unsubscribe';

// @ts-ignore
import html from './uri-navigation-bar.component.html?raw';
// @ts-ignore
import style from './uri-navigation-bar.component.scss?inline';
import { serializeURI, IURI, parseURI } from '@uni-fs/core';
import { extractPathSegmentsOfURI } from '../../../../../misc/extract-path-segments-of-uri';

/**
 * COMPONENT: 'app-control-bar'
 */

export interface IAppURINavigationBarComponentData {
  readonly uri: SignalInput<string>;
  readonly uriChange: Output<string>;
}

type IAppURINavigationBarView =
  | 'raw'
  | 'parsed'
  ;

interface ITemplateData {
  //
  readonly onClickSwapViewIcon: IObserver<Event>;
  //
  readonly inputValue: IReadonlySignal<string>;
  readonly onInputValueChange: IObserver<Event>;
  readonly onInputBlur: IObserver<Event>;
  readonly onSubmit: IObserver<Event>;
  //
  readonly parsedURI: IReadonlySignal<IURI>;
  readonly uriPathSegments: IReadonlySignal<readonly string[]>;
  // readonly uriHasAuthority$: IObservable<boolean>;
  // readonly uriHasUserinfo$: IObservable<boolean>;
  // readonly uriUserinfo$: IObservable<string | undefined>;
  // readonly uriUsername$: IObservable<string>;
  // readonly uriPassword$: IObservable<string>;
  // readonly uriHostname$: IObservable<string>;
  // readonly uriPort$: IObservable<string>;
  // readonly uriPathSegments$: IObservable<readonly string[]>;
  // readonly uriSearchSegments$: IObservable<readonly [string, string][]>;
  // readonly uriHash$: IObservable<string>;
  readonly onClickOrigin: IObserver<Event>;
  readonly onClickPathSegment: (index$: IObservable<number>) => IObservable<IObserver<MouseEvent>>;
}

export const AppURINavigationBarComponent = new Component<HTMLElement, IAppURINavigationBarComponentData, ITemplateData>({
  name: 'app-uri-navigation-bar',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      IconSwapVerticalComponent,
    ],
    modifiers: [
      ElementReferenceModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IAppURINavigationBarComponentData => {
    return {
      // uri: input<URI>(new URI('https://a:b@c.d:123/xefsefsef/ybhfdthfzn/zgmug/?o=p&z#q=s')),
      uri: signalInput<string>('google-drive://a:b@c.d:123/xefsefsef/ybhfdthfzn/zgmug/?o=p&z#q=s'),
      uriChange: output<string>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IAppURINavigationBarComponentData>): ITemplateData => {

    // URI
    const rawURI = node.inputs.uri.signal;
    const parsedURI = computed((): IURI => parseURI(rawURI()));

    const $uriChange = node.$output('uriChange');

    // VIEW
    const viewKey: string = 'uri-navigation-bar-view';

    const db: LocalStorageKeyValueDatabase<IAppURINavigationBarView> = SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE as LocalStorageKeyValueDatabase<IAppURINavigationBarView>;

    const view = signal<IAppURINavigationBarView>(db.get(viewKey) ?? 'raw');

    node.onConnected((): IUnsubscribe => {
      return effect((): void => {
        db.set(viewKey, view());
      });
    });

    node.onConnected((): IUnsubscribe => {
      return fromEventTarget<'keydown', KeyboardEvent>(document, 'keydown')((event: KeyboardEvent): void => {
        if (event.altKey && (event.key === 't')) {
          onClickSwapViewIcon();
        }
      });
    });

    node.setReactiveClassNamesList(map$$(view.toObservable(), (view: IAppURINavigationBarView): IClassNamesList => {
      return new Set<string>([
        `view-${view}`,
      ]);
    }));

    const onClickSwapViewIcon = (): void => {
      view.set((view() === 'raw') ? 'parsed' : 'raw');
    };

    // SHORTCUTS

    node.onConnected((): IUnsubscribe => {
      return fromEventTarget<'keydown', KeyboardEvent>(document, 'keydown')((event: KeyboardEvent): void => {
        if (event.altKey && (event.key === 'd')) {
          event.preventDefault();
          virtualDOMNodeQuerySelectorOrThrow<VirtualReactiveElementNode<HTMLElement>>(node, '[tabindex="0"]').elementNode.focus();
        }
      });
    });

    // INPUT

    const inputValue = signal<string>('');

    node.onConnected((): IUnsubscribe => {
      return effect((): void => {
        inputValue.set(rawURI());
      }, { signalWriteMode: 'allow' }); // WARN
    });

    const inputURI = computed((): IURI => parseURI(inputValue()));

    const isInputURIValid = computed((): boolean => {
      try {
        inputURI();
        return true;
      } catch {
        return false;
      }
    });

    node.setReactiveClass('valid', isInputURIValid.toObservable());

    const onInputValueChange = (event: Event): void => {
      inputValue.set((event.target as HTMLInputElement).value);
    };

    const onInputBlur = (): void => {
      inputValue.set(rawURI());
    };

    const onSubmit = (event: Event): void => {
      event.preventDefault();

      if (isInputURIValid()) {
        $uriChange(
          serializeURI(inputURI()),
        );
      }
    };

    const uriPathSegments = computed((): string[] => extractPathSegmentsOfURI(parsedURI()));

    const onClickOrigin = (): void => {
      $uriChange(
        serializeURI({
          ...parsedURI(),
          path: '/',
        }),
      );
    };

    const onClickPathSegment = (
      index$: IObservable<number>,
    ): IObservable<IObserver<MouseEvent>> => {
      return map$$(index$, (index: number): IObserver<MouseEvent> => {
        return () => {
          const segments: string[] = extractPathSegmentsOfURI(parsedURI());

          $uriChange(
            serializeURI({
              ...parsedURI(),
              path: `/${segments.slice(0, index + 1).join('/')}`,
            }),
          );
        };
      });
    };

    return {
      onClickSwapViewIcon,
      //
      inputValue,
      onInputValueChange,
      onInputBlur,
      onSubmit,
      //
      parsedURI,
      uriPathSegments,
      onClickOrigin,
      onClickPathSegment,
    };
  },
});

