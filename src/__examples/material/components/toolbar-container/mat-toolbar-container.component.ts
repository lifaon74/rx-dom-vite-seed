import { function$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  IClassNamesList,
  VirtualCustomElementNode,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-toolbar-container.component.html?raw';
// @ts-ignore
import style from './mat-toolbar-container.component.scss?inline';

/** TYPES **/

// https://material.angular.io/components/toolbar/overview

export type IMatToolbarComponentPosition =
  | 'top'
  | 'bottom'
  ;

/**
 * COMPONENT: 'mat-toolbar-container'
 */

interface IMatToolbarContainerComponentConfig {
  inputs: [
    ['position', IMatToolbarComponentPosition],
  ];
}

export const MatToolbarContainerComponent = createComponent<IMatToolbarContainerComponentConfig>({
  name: 'mat-toolbar-container',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['position', 'top'],
  ],
  init: (node: VirtualCustomElementNode<IMatToolbarContainerComponentConfig>): void => {
    const position$ = node.inputs.get$('position');

    const classList$ = function$$(
      [position$],
      (position): IClassNamesList => {
        return new Set([
          `mat-position-${position}`,
        ]);
      },
    );

    node.setReactiveClassNamesList(classList$);
  },
});
