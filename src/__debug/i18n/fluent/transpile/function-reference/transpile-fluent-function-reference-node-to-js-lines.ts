import { FunctionReference, InlineExpression, NamedArgument } from '@fluent/syntax';
import { ILines, indentLines, inlineLastLines, wrapLinesWithCurlyBrackets, wrapLinesWithRoundBrackets } from '@lirx/dom';
import { transpileFluentInlineExpressionNodeToJSLines } from '../inline-expression/transpile-fluent-inline-expression-node-to-js-lines';
import { transpileFluentLiteralNodeToJSLines } from '../literal/transpile-fluent-literal-node-to-js-lines';
import { CALL_FUNCTION_NAME } from '../shared/call-function-name.constants';

export interface ITranspileFluentFunctionReferenceNodeToJSLinesOptions {
  functionReferenceNode: FunctionReference;
}

export function transpileFluentFunctionReferenceNodeToJSLines(
  {
    functionReferenceNode,
    ...options
  }: ITranspileFluentFunctionReferenceNodeToJSLinesOptions,
): ILines {
  return [
    `${CALL_FUNCTION_NAME}(${JSON.stringify(functionReferenceNode.id.name)}, [`,
    ...indentLines([
      ...functionReferenceNode.arguments.positional.flatMap((inlineExpression: InlineExpression): ILines => {
        return inlineLastLines(
          transpileFluentInlineExpressionNodeToJSLines({
            ...options,
            inlineExpressionNode: inlineExpression,
          }),
          [','],
        );
      }),
      ...wrapLinesWithCurlyBrackets(
        functionReferenceNode.arguments.named.flatMap((namedArgument: NamedArgument): ILines => {
          return [
            ...inlineLastLines(
              [`${namedArgument.name.name}: `],
              wrapLinesWithRoundBrackets( // could be optional
                transpileFluentLiteralNodeToJSLines({
                  ...options,
                  literalNode: namedArgument.value,
                }),
              ),
              [','],
            ),
          ];
        }),
        false,
      ),
    ]),
    `])`,
  ];
}
