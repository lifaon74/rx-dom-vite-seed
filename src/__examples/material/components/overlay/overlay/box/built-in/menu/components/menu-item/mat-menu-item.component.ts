import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-menu-item.component.html?raw';
// @ts-ignore
import style from './mat-menu-item.component.scss?inline';

/**
 * COMPONENT: 'mat-menu-item'
 */

interface IMatMenuItemComponentConfig {
  element: HTMLAnchorElement;
  inputs: [
    ['disabled', boolean],
  ];
}

export type IMatMenuItemVirtualCustomElementNode = VirtualCustomElementNode<IMatMenuItemComponentConfig>;

export const MatMenuItemComponent = createComponent<IMatMenuItemComponentConfig>({
  name: 'mat-menu-item',
  extends: 'a',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['disabled', false],
  ],
  init: (node: IMatMenuItemVirtualCustomElementNode): void => {
    const disabled$ = node.inputs.get$('disabled');

    node.setReactiveClass('mat-disabled', disabled$);

    node.onConnected$(disabled$)((disabled: boolean): void => {
      node.elementNode.tabIndex = disabled ? - 1 : 0;
    });
  },
});


