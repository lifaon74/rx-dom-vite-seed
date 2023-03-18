import { Attribute, Message, Term } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { isMessageNode, isTermNode } from '../../nodes/is-fluent-node';
import { REGISTER_MESSAGE_NAME } from './register-message-name.constants';
import { REGISTER_TERM_NAME } from './register-term-name.constants';
import { transpileFluentRegisterNamedPatternNodeToJSLines } from './transpile-fluent-register-named-pattern-node-to-js-lines';

export type IMessageOrTermNode =
  | Message
  | Term
  ;

export interface ITranspileFluentMessageOrTermNodeToJSLinesOptions {
  node: IMessageOrTermNode;
}

export function transpileFluentMessageOrTermNodeToJSLines(
  {
    node,
    ...options
  }: ITranspileFluentMessageOrTermNodeToJSLinesOptions,
): ILines {
  const registerFunctionName: string = getRegisterFunctionName(node);

  return [
    ...transpileFluentRegisterNamedPatternNodeToJSLines({
      registerFunctionName,
      key: node.id.name,
      patternNode: node.value,
    }),
    ...node.attributes.flatMap((attribute: Attribute): ILines => {
      return transpileFluentRegisterNamedPatternNodeToJSLines({
        registerFunctionName,
        key: `${node.id.name}.${attribute.id.name}`,
        patternNode: attribute.value,
      });
    }),
  ];
}

/*---*/

function getRegisterFunctionName(
  node: IMessageOrTermNode,
): string {
  if (isMessageNode(node)) {
    return REGISTER_MESSAGE_NAME;
  } else if (isTermNode(node)) {
    return REGISTER_TERM_NAME;
  } else {
    throw new Error(`Unknown Node: ${(node as any).type}`);
  }
}
