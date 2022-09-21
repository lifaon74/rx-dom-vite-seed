import { IObservable, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  IClassNamesList,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { IconCloseComponent, IconPauseComponent, IconPlayComponent } from '@lirx/mdi';
import { MatIconButtonComponent } from '@lirx/dom-material';

// @ts-ignore
import html from './async-task.component.html?raw';
// @ts-ignore
import style from './async-task.component.scss?inline';

/*---*/

export type IAppAsyncTaskComponentState =
  | 'running'
  | 'running-and-pausable'
  | 'paused'
  | 'complete'
  | 'errored'
  ;

/**
 * COMPONENT: 'app-async-task'
 */

// export const APP_ASYNC_TASK_COMPONENT_PROGRESS_ERROR = -2;
// export const APP_ASYNC_TASK_COMPONENT_PROGRESS_UNDETERMINED = -1;

interface IData {
  readonly name$: IObservable<string>;
  readonly hasMessage$: IObservable<boolean>;
  readonly message$: IObservable<string>;
  readonly progressPercent$: IObservable<string | null>;
  readonly progressTitle$: IObservable<string>;
}

interface IAppAsyncTaskComponentConfig {
  element: HTMLElement;
  inputs: [
    ['name', string],
    ['message', string],
    ['progress', number],
    ['state', IAppAsyncTaskComponentState],
  ];
  data: IData;
}

export const AppAsyncTaskComponent = createComponent<IAppAsyncTaskComponentConfig>({
  name: 'app-async-task',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      IconPauseComponent,
      IconPlayComponent,
      IconCloseComponent,
      MatIconButtonComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['name'],
    ['message', ''],
    ['progress', 0],
    ['state', 'running'],
  ],
  init: (node: VirtualCustomElementNode<IAppAsyncTaskComponentConfig>): IData => {
    const name$ = node.inputs.get$('name');
    const message$ = node.inputs.get$('message');
    const progress$ = node.inputs.get$('progress');
    const state$ = node.inputs.get$('state');

    const hasMessage$ = map$$(message$, (message: string): boolean => (message !== ''));

    const progressPercent$ = map$$(progress$, (progress: number): string | null => {
      return (progress < 0)
        ? null
        : `${progress * 100}%`;
    });

    const progressTitle$ = map$$(progress$, (progress: number): string => {
      return (progress < 0)
        ? ''
        : `${Math.floor(progress * 100)}%`;
    });

    const stateClassList$ = map$$(state$, (state: IAppAsyncTaskComponentState): IClassNamesList => {
      return new Set<string>([`state-`]);
    });

    // TODO continue here
    const undetermined = map$$(progress$, (progress: number): boolean => (progress < 0));

    node.setReactiveClassNamesList(stateClassList$);

    return {
      name$,
      hasMessage$,
      message$,
      progressPercent$,
      progressTitle$,
    };
  },
});

