import { conditional$$, fromEventTarget, not$$ } from '@lirx/core';
import { createComponent } from '../../../../../component/create/create-component';
import { compileStyleAsComponentStyle } from '../../../../../component/style/compile-style-as-component-style';
import { compileReactiveHTMLAsComponentTemplate } from '../../../../../component/template/compile-reactive-html-as-component-template';
import { getElementCSSVariableValueOrDefault } from '../../../../../misc/dom/get-element-css-variable-value';
import { querySelectorOrThrow } from '../../../../../misc/dom/query-selector-or-throw';
import { VirtualCustomElementNode } from '../../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { createRippleFromElementAndPointerEvent } from './functions/create-ripple-from-element-and-pointer-event';

// @ts-ignore
import html from './mat-ripple.component.html?raw';
// @ts-ignore
import style from './mat-ripple.component.scss?inline';

/**
 * COMPONENT: 'mat-ripple'
 */

interface IMatRippleComponentConfig {
  inputs: [
    ['disabled', false],
  ];
}

export const MatRippleComponent = createComponent<IMatRippleComponentConfig>({
  name: 'mat-ripple',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['disabled', false],
  ],
  init: (node: VirtualCustomElementNode<IMatRippleComponentConfig>): void => {
    const element: HTMLElement = node.elementNode;

    const onPointerDown = (event: PointerEvent): void => {
      const ripplesContainerElement: HTMLDivElement = querySelectorOrThrow<HTMLDivElement>(element, ':scope > .ripples-container');

      const color: string = getElementCSSVariableValueOrDefault(element, '--mat-ripple-color', 'rgba(0, 0, 0, 0.1)');
      const openDuration: number = Number(getElementCSSVariableValueOrDefault(element, '--mat-ripple-open-duration', '200'));
      const closeDuration: number = Number(getElementCSSVariableValueOrDefault(element, '--mat-ripple-close-duration', '200'));

      const {
        element: rippleElement,
        open,
        close,
      } = createRippleFromElementAndPointerEvent({
        element,
        event,
        color,
        openDuration,
        closeDuration,
      });

      ripplesContainerElement.appendChild(rippleElement);

      const pointerUp$ = fromEventTarget(window, 'pointerup');

      const unsubscribePointerUp = pointerUp$(() => {
        unsubscribePointerUp();
        openPromise.then(() => {
          return close()
            .then(() => {
              rippleElement.remove();
            });
        });
      });

      const openPromise = open();
    };

    const pointerDown$ = conditional$$(
      fromEventTarget<'pointerdown', PointerEvent>(element, 'pointerdown'),
      not$$(node.inputs.get$('disabled')),
    );

    pointerDown$(onPointerDown);
  },
});

