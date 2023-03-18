import { Entry, Resource } from '@fluent/syntax';
import { ILines, indentLines } from '@lirx/dom';
import { REGISTER_MESSAGE_NAME } from '../shared/register-message-name.constants';
import { REGISTER_TERM_NAME } from '../shared/register-term-name.constants';
import { RENDER_MESSAGE_NAME } from '../shared/render-message-name.constants';
import { RENDER_TERM_NAME } from '../shared/render-term-name.constants';
import { transpileFluentResourceEntryNodeToJSLines } from './transpile-fluent-resource-entry-node-to-js-lines';

export interface ITranspileFluentResourceNodeToJSLinesOptions {
  resourceNode: Resource;
}

export function transpileFluentResourceNodeToJSLines(
  {
    resourceNode,
    ...options
  }: ITranspileFluentResourceNodeToJSLinesOptions,
): ILines {
  return [
    `({`,
    ...indentLines([
      `${REGISTER_MESSAGE_NAME},`,
      `${RENDER_MESSAGE_NAME},`,
      `${REGISTER_TERM_NAME},`,
      `${RENDER_TERM_NAME},`,
    ]),
    `}) => {`,
    ...indentLines(
      resourceNode.body
        .flatMap((entry: Entry): ILines => {
          return transpileFluentResourceEntryNodeToJSLines({
            entryNode: entry,
          });
        }),
    ),
    `}`,
  ];
}
