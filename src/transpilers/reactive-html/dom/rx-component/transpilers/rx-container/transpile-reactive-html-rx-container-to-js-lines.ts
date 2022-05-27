import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLNodesToJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-js-lines';
import { isRXContainer } from './is-rx-container';
import { RX_CONTAINER_TAG_NAME } from './rx-container-tag-name.constant';

/*
Syntax:

<rx-container
>
  ...content
</rx-container>

 */

export interface ITranspileReactiveHTMLRXContainerToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXContainerToJSLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXContainerToJSLinesOptions,
): ILinesOrNull {
  if (isRXContainer(node)) {
    if (node.attributes.length === 0) {
      return transpileReactiveHTMLNodesToJSLines({
        ...options,
        nodes: node.childNodes,
      });
    } else {
      throw new Error(`${RX_CONTAINER_TAG_NAME} must not have any attributes`);
    }
  } else {
    return null;
  }
}

