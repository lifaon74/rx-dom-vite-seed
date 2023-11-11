import { IUnsubscribe } from '@lirx/unsubscribe';
import { fromEventTarget } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, VirtualComponentNode, Component } from '@lirx/dom';
import {
  IconArrowLeftComponent,
  IconArrowRightComponent,
  IconDotsVerticalComponent,
  IconFormatListBulletedSquareComponent,
  IconMagnifyComponent,
  IconViewGridComponent,
} from '@lirx/mdi';
import { AppURINavigationBarComponent } from './components/uri-navigation-bar/uri-navigation-bar.component';
import { MatIconButtonModifier } from '@lirx/dom-material';

// @ts-ignore
import html from './control-bar.component.html?raw';
// @ts-ignore
import style from './control-bar.component.scss?inline';

/**
 * COMPONENT: 'app-control-bar'
 */

export const AppControlBarComponent = new Component<HTMLElement, object, object>({
  name: 'app-control-bar',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      IconArrowLeftComponent,
      IconArrowRightComponent,
      IconMagnifyComponent,
      IconFormatListBulletedSquareComponent,
      IconViewGridComponent,
      IconDotsVerticalComponent,
      AppURINavigationBarComponent,
    ],
    modifiers: [
      MatIconButtonModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (node: VirtualComponentNode<HTMLElement, object>): void => {

    // SHORTCUTS

    node.onConnected((): IUnsubscribe => {
      const keyDownDocument$ = fromEventTarget<'keydown', KeyboardEvent>(document, 'keydown');

      return keyDownDocument$((event: KeyboardEvent): void => {
        if (event.ctrlKey && (event.key === 'f')) {
          event.preventDefault();
          // TODO open search
        }
      });

      // keyDownDocument$((event: KeyboardEvent): void => {
      //   console.log(event.key);
      //   if (event.altKey && (event.key === 'ArrowRight')) {
      //     event.preventDefault();
      //     // TODO open next folder
      //   }
      // });
      //
      // keyDownDocument$((event: KeyboardEvent): void => {
      //   if (event.altKey && (event.key === 'ArrowLeft')) {
      //     event.preventDefault();
      //     // TODO open previous folder
      //   }
      // });
    });

  },
});

