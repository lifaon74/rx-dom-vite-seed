import { function$$ } from '@lirx/core';
import { createComponent } from '../../../../component/create/create-component';
import { compileStyleAsComponentStyle } from '../../../../component/style/compile-style-as-component-style';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../component/template/compile-reactive-html-as-component-template';
import { VirtualCustomElementNode } from '../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { IClassNamesList } from '../../../../virtual-node/dom/nodes/reactive/element/class/class-names-list.type';

// @ts-ignore
import html from './mat-toolbar-container.component.html?raw';
// @ts-ignore
import style from './mat-toolbar-container.component.scss?inline';

/** TYPES **/

// https://material.angular.io/components/toolbar/overview

export type IMatToolbarComponentPosition =
  | 'start'
  | 'end'
  ;

/** COMPONENT **/

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
    ['position', 'start'],
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
