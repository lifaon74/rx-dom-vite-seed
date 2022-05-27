import { createCounter } from '../../misc/create-counter';
import { linesOrNullToLines } from '../../transpilers/misc/lines/functions/lines-or-null-to-lines';
import { linesToString } from '../../transpilers/misc/lines/functions/lines-to-string';
import { ILines } from '../../transpilers/misc/lines/lines.type';
import { transpileReactiveStyleToCSSLines } from '../../transpilers/reactive-style/css/transpile-reactive-style-to-css-lines';
import {
  IGenericGenericVirtualCustomElementNode,
} from '../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { IComponentStyle } from '../create/create-component';

const COMPONENT_STYLES_ID = createCounter();

export function compileStyleAsComponentStyle(
  css: string,
): IComponentStyle {
  const id: string = `style-${COMPONENT_STYLES_ID()}`;

  const lines: ILines = linesOrNullToLines(
    transpileReactiveStyleToCSSLines({
      css,
      hostSelector: `[${id}]`,
    }),
  );

  const compiledReactiveCSS: string = linesToString(lines);

  // console.log(compiledReactiveCSS);

  const styleElement = document.createElement('style');
  styleElement.setAttribute('host', id);
  styleElement.textContent = compiledReactiveCSS;

  let count: number = 0;

  const connect = (): void => {
    count++;
    if (count === 1) {
      document.head.appendChild(styleElement);
    }
  };

  const disconnect = (): void => {
    count--;
    if (count === 0) {
      document.head.removeChild(styleElement);
    }
  };

  return (
    node: IGenericGenericVirtualCustomElementNode,
  ): void => {
    node.setAttribute(id, '');

    let fistConnected: boolean = true;
    node.isConnected$((connected: boolean): void => {
      if (connected) {
        connect();
      } else if (!fistConnected) {
        disconnect();
      }
      fistConnected = false;
    });
  };
}



