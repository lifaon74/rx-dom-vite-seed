import {
  combineLatestSpread,
  createErrorNotification,
  createNextNotification,
  fromEventTarget,
  gt$$,
  IErrorNotification,
  INextNotification,
  IObservable,
  IObserver,
  let$$,
  map$$,
  merge,
  neq$$,
  readObservableValue,
  shareRL$$,
  single,
  switchMap$$,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualComponentNode,
  virtualDOMNodeQuerySelectorOrThrow,
  VirtualReactiveElementNode,
} from '@lirx/dom';
import { ELEMENT_REFERENCE_MODIFIER } from '@lirx/dom-material';
import { IconSwapVerticalComponent } from '@lirx/mdi';
import {
  LocalStorageKeyValueDatabase,
  SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE,
} from '../../../../../../../helpers/key-value-database/local-storage-key-value-database';

// @ts-ignore
import html from './url-navigation-bar.component.html?raw';
// @ts-ignore
import style from './url-navigation-bar.component.scss?inline';

/**
 * COMPONENT: 'app-control-bar'
 */

interface ITemplateData {
  readonly gt$$: typeof gt$$;
  readonly neq$$: typeof neq$$;
  readonly single: typeof single;
  //
  readonly $onClickSwapViewIcon: IObserver<Event>;
  //
  readonly $inputRef: IObserver<HTMLInputElement>;
  readonly inputValue$: IObservable<string>;
  readonly $onSubmit: IObserver<Event>;
  //
  readonly urlProtocol$: IObservable<string>;
  readonly urlUsername$: IObservable<string>;
  readonly urlPassword$: IObservable<string>;
  readonly urlHostname$: IObservable<string>;
  readonly urlPort$: IObservable<string>;
  readonly urlPathSegments$: IObservable<readonly string[]>;
  readonly urlSearchSegments$: IObservable<readonly [string, string][]>;
  readonly urlHash$: IObservable<string>;
  readonly $onClickOrigin: IObserver<Event>;
  readonly $onClickPathSegment: IObserver<IObservable<number>>;
}

interface IAppURLNavigationBarComponentConfig {
  element: HTMLElement;
  inputs: [
    ['url', URL],
  ],
  outputs: [
    ['url', URL],
  ],
  data: ITemplateData;
}

export const AppURLNavigationBarComponent = createComponent<IAppURLNavigationBarComponentConfig>({
  name: 'app-url-navigation-bar',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      IconSwapVerticalComponent,
    ],
    modifiers: [
      ELEMENT_REFERENCE_MODIFIER,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    // ['url', new URL('file://abc/def')],
    ['url', new URL('https://a:b@c.d:123/xefsefsef/ybhfdthfzn/zgmug/?o=p&z#q=s')],
  ],
  outputs: [
    'url',
  ],
  init: (node: VirtualComponentNode<IAppURLNavigationBarComponentConfig>): ITemplateData => {

    const url$ = node.inputs.get$('url');
    const getURL = node.inputs.getSource('url').getValue;
    const $url = node.outputs.$set('url');

    // node.outputs.get$('url')($log);

    // VIEW
    const viewKey: string = 'url-navigation-bar-view';

    const db: LocalStorageKeyValueDatabase<boolean> = SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE as LocalStorageKeyValueDatabase<boolean>;

    const [$isNavigatorView, isNavigatorView$, getIsNavigatorView] = let$$<boolean>(db.get(viewKey) ?? false);

    node.onConnected$(isNavigatorView$)((enabled: boolean): void => {
      db.set(viewKey, enabled);
    });

    node.onConnected$(fromEventTarget<'keydown', KeyboardEvent>(document, 'keydown'))((event: KeyboardEvent): void => {
      if (event.altKey && (event.key === 't')) {
        $onClickSwapViewIcon();
      }
    });

    node.setReactiveClass('view-navigator', isNavigatorView$);

    const $onClickSwapViewIcon = (): void => {
      $isNavigatorView(!getIsNavigatorView());
    };

    // SHORTCUTS

    node.onConnected$(fromEventTarget<'keydown', KeyboardEvent>(document, 'keydown'))((event: KeyboardEvent): void => {
      if (event.altKey && (event.key === 'd')) {
        event.preventDefault();
        virtualDOMNodeQuerySelectorOrThrow<VirtualReactiveElementNode<HTMLElement>>(node, '[tabindex="0"]').elementNode.focus();
      }
    });

    // INPUT

    const [$inputRef, inputRef$] = let$$<HTMLInputElement>();

    const defaultInputValue$ = map$$(url$, (url: URL): string => url.href);

    const userInputValue$ = switchMap$$(inputRef$, (input: HTMLInputElement): IObservable<string> => {
      return map$$(fromEventTarget(input, 'input'), (): string => input.value);
    });

    const userBlurInputValue$ = switchMap$$(
      combineLatestSpread(inputRef$, url$),
      ([input, url]: readonly [HTMLInputElement, URL]): IObservable<string> => {
        return map$$(fromEventTarget(input, 'blur'), (): string => url.href);
      },
    );

    const inputValue$ = shareRL$$(
      merge([
        defaultInputValue$,
        userInputValue$,
        userBlurInputValue$,
      ]),
    );

    type IInputURLNotifications = INextNotification<URL> | IErrorNotification;

    const inputURL$ = map$$(inputValue$, (inputValue: string): IInputURLNotifications => {
      try {
        return createNextNotification(new URL(inputValue));
      } catch {
        return createErrorNotification(new Error(`Invalid URL`));
      }
    });

    const isInputURLValid$ = map$$(inputURL$, (notification: IInputURLNotifications): boolean => {
      return notification.name === 'next';
    });

    node.setReactiveClass('valid', isInputURLValid$);

    const $onSubmit = (event: Event): void => {
      event.preventDefault();

      const inputURL: IInputURLNotifications = readObservableValue(inputURL$, () => {
        throw new Error(`cannot read urlState$`);
      });

      if (inputURL.name === 'next') {
        $url(inputURL.value);
      }
    };

    // URL PARTS
    const urlProtocol$ = map$$(url$, (url: URL): string => url.protocol);
    const urlUsername$ = map$$(url$, (url: URL): string => url.username);
    const urlPassword$ = map$$(url$, (url: URL): string => url.password);
    const urlHostname$ = map$$(url$, (url: URL): string => url.hostname);
    const urlPort$ = map$$(url$, (url: URL): string => url.port);

    const urlPathSegments$ = map$$(url$, extractPathSegmentsOfURL);

    const urlHash$ = map$$(url$, (url: URL): string => url.hash);

    const urlSearchSegments$ = map$$(url$, (url: URL): readonly [string, string][] => {
      return Array.from(url.searchParams[Symbol.iterator]());
    });

    const $onClickOrigin = (): void => {
      const newURL: URL = new URL(getURL());
      newURL.pathname = '/';
      $url(newURL);
    };

    const $onClickPathSegment = (
      index$: IObservable<number>,
    ): void => {
      const index: number = readObservableValue(index$, () => {
        throw new Error(`cannot read index$`);
      });

      const url: URL = getURL();

      const segments: string[] = extractPathSegmentsOfURL(url);

      const newURL: URL = new URL(url);
      newURL.pathname = `/${segments.slice(0, index + 1).join('/')}`;
      $url(newURL);
    };

    return {
      gt$$,
      neq$$,
      single,
      //
      $onClickSwapViewIcon,
      //
      $inputRef,
      inputValue$,
      $onSubmit,
      //
      urlProtocol$,
      urlUsername$,
      urlPassword$,
      urlHostname$,
      urlPort$,
      urlPathSegments$,
      urlSearchSegments$,
      urlHash$,
      $onClickOrigin,
      $onClickPathSegment,
    };
  },
});

/** FUNCTIONS **/

function extractPathSegmentsOfURL(url: URL): string[] {
  const segments: string[] = url.pathname.split('/');
  if (
    (segments.length > 1)
    && (segments[0] === '')
  ) {
    segments.shift();
  }
  return segments;
}
