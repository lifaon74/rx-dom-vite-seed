import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualComponentNode } from '@lirx/dom';
import { IObservable, single } from '@lirx/core';
import {
  AppAsyncTaskComponent,
} from './components/async-task/async-task.component';

// @ts-ignore
import html from './async-task-list.component.html?raw';
// @ts-ignore
import style from './async-task-list.component.scss?inline';

export interface IAppAsyncTaskListComponentTask {
  readonly name$: IObservable<string>;
  readonly message$: IObservable<string>;
  readonly progress$: IObservable<number>;
  readonly pausable$: IObservable<boolean>;
  readonly paused$: IObservable<boolean>;
}

/**
 * COMPONENT: 'app-async-task-list'
 */

interface ITemplateData {
  readonly tasks$: IObservable<readonly IAppAsyncTaskListComponentTask[]>;
}

interface IAppAsyncTaskListComponentConfig {
  element: HTMLElement;
  data: ITemplateData;
}

export const AppAsyncTaskListComponent = createComponent<IAppAsyncTaskListComponentConfig>({
  name: 'app-async-task-list',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      AppAsyncTaskComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualComponentNode<IAppAsyncTaskListComponentConfig>): ITemplateData => {

    const tasks$ = single<readonly IAppAsyncTaskListComponentTask[]>([
      {
        name$: single('Copying abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc'),
        message$: single('1234/4589 files'),
        progress$: single(0.1),
        paused$: single(false),
        pausable$: single(true),
      },
      {
        name$: single('Undetermined'),
        message$: single(''),
        progress$: single(1),
        paused$: single(false),
        pausable$: single(true),
      },
      {
        name$: single('Undetermined paused'),
        message$: single(''),
        progress$: single(1),
        paused$: single(true),
        pausable$: single(true),
      },
      {
        name$: single('Undetermined not pausable'),
        message$: single(''),
        progress$: single(1),
        paused$: single(true),
        pausable$: single(false),
      },
      {
        name$: single('Error'),
        message$: single('Failed to copy'),
        progress$: single(1),
        paused$: single(false),
        pausable$: single(true),
      },
      {
        name$: single('Complete'),
        message$: single('Done !'),
        progress$: single(1),
        paused$: single(false),
        pausable$: single(true),
      },
    ]);

    return {
      tasks$,
    };
  },
});

