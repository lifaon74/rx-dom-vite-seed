import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { AppFileListComponent } from '../components/file-list/file-list.component';
import { AppControlBarComponent } from '../components/control-bar/control-bar.component';

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

export const AppMainComponent = new Component<HTMLElement, object, object>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      AppControlBarComponent,
      AppFileListComponent,
      // AppAsyncTaskListComponent, // TODO
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
});

