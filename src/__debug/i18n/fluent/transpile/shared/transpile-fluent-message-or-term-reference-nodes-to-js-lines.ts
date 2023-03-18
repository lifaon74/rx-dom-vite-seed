import { MessageReference, NamedArgument, TermReference } from '@fluent/syntax';
import { ILines, inlineLastLines, wrapLinesWithRoundBrackets, wrapLinesWithSquareBrackets } from '@lirx/dom';
import { isMessageReferenceNode, isTermReferenceNode } from '../../nodes/is-fluent-node';
import { transpileFluentLiteralNodeToJSLines } from '../literal/transpile-fluent-literal-node-to-js-lines';
import { RENDER_MESSAGE_NAME } from './render-message-name.constants';
import { RENDER_TERM_NAME } from './render-term-name.constants';
import { transpileFluentRenderFunctionToJSLines } from './transpile-fluent-render-function-to-js-lines';

export type IMessageOrTermReferenceNodes =
  | MessageReference
  | TermReference
  ;

export interface ITranspileFluentMessageOrTermReferenceNodesToJSLinesOptions {
  node: IMessageOrTermReferenceNodes;
}

export function transpileFluentMessageOrTermReferenceNodesToJSLines(
  {
    node,
    ...options
  }: ITranspileFluentMessageOrTermReferenceNodesToJSLinesOptions,
): ILines {
  return transpileFluentRenderFunctionToJSLines({
    ...options,
    renderFunctionName: getRenderFunctionName(node),
    key: getKey(node),
    extraArguments: getExtraArguments(node),
  });
}

/*---*/

function getRenderFunctionName(
  node: IMessageOrTermReferenceNodes,
): string {
  if (isMessageReferenceNode(node)) {
    return RENDER_MESSAGE_NAME;
  } else if (isTermReferenceNode(node)) {
    return RENDER_TERM_NAME;
  } else {
    throw new Error(`Unknown Node: ${(node as any).type}`);
  }
}

function getKey(
  node: IMessageOrTermReferenceNodes,
): string {
  return (node.attribute === null)
    ? node.id.name
    : `${node.id.name}.${node.attribute.name}`;
}

function getExtraArguments(
  node: IMessageOrTermReferenceNodes,
): ILines {
  if (isMessageReferenceNode(node)) {
    return [];
  } else if (isTermReferenceNode(node)) {
    return (
      (
        (node.arguments === null)
        || (node.arguments.named.length === 0)
      )
        ? []
        : inlineLastLines(
          wrapLinesWithSquareBrackets(
            node.arguments.named.flatMap((namedArgument: NamedArgument): ILines => {
              return inlineLastLines(
                wrapLinesWithSquareBrackets([
                  `${JSON.stringify(namedArgument.name.name)},`,
                  ...inlineLastLines(
                    wrapLinesWithRoundBrackets( // could be optional
                      transpileFluentLiteralNodeToJSLines({
                        literalNode: namedArgument.value,
                      }),
                    ),
                    [','],
                  ),
                ]),
                [','],
              );
            }),
            false,
          ),
          [','],
        )
    );
  } else {
    throw new Error(`Unknown Node: ${(node as any).type}`);
  }
}
