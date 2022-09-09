import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';
import { AppAsyncTaskListComponent } from '../components/async-task-list/async-task-list.component';
import { AppControlBarComponent } from '../components/control-bar/control-bar.component';
import { AppFilesListComponent } from '../components/files-list/files-list.component';

// @ts-ignore
import html from './main.component.html?raw';
// @ts-ignore
import style from './main.component.scss?inline';


/*
DOC:
https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec

 */
/**
 * COMPONENT: 'app-main'
 */

interface IData {

}

interface IAppMainComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const AppMainComponent = createComponent<IAppMainComponentConfig>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      AppControlBarComponent,
      AppFilesListComponent,
      AppAsyncTaskListComponent, // TODO
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualCustomElementNode<IAppMainComponentConfig>): IData => {
    return {};
  },
});

