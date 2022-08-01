import { fromEventTarget } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';
import {
  IconArrowLeftComponent,
  IconArrowRightComponent, IconDotsVerticalComponent,
  IconFormatListBulletedSquareComponent,
  IconMagnifyComponent,
  IconViewGridComponent,
} from '@lirx/mdi';
import { MatIconButtonComponent } from '../../../../material/components/buttons/icon/mat-icon-button.component';
import { AppURLNavigationBarComponent } from './components/url-navigation-bar/url-navigation-bar.component';

// @ts-ignore
import html from './control-bar.component.html?raw';
// @ts-ignore
import style from './control-bar.component.scss?inline';

/**
 * COMPONENT: 'app-control-bar'
 */

interface IData {

}

interface IAppControlBarComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const AppControlBarComponent = createComponent<IAppControlBarComponentConfig>({
  name: 'app-control-bar',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatIconButtonComponent,
      IconArrowLeftComponent,
      IconArrowRightComponent,
      IconMagnifyComponent,
      IconFormatListBulletedSquareComponent,
      IconViewGridComponent,
      IconDotsVerticalComponent,
      AppURLNavigationBarComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualCustomElementNode<IAppControlBarComponentConfig>): IData => {

    // SHORTCUTS

    const keyDownDocument$ = node.onConnected$(fromEventTarget<'keydown', KeyboardEvent>(document, 'keydown'));

    keyDownDocument$((event: KeyboardEvent): void => {
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

    return {};
  },
});

