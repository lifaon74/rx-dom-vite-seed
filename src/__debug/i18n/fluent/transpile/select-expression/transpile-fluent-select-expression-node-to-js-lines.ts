import { Identifier, NumberLiteral, SelectExpression, Variant } from '@fluent/syntax';
import { ILines, indentLines, inlineLastLines, wrapLinesWithSquareBrackets } from '@lirx/dom';
import { isIdentifierNode, isNumberLiteralNode } from '../../nodes/is-fluent-node';
import { transpileFluentInlineExpressionNodeToJSLines } from '../inline-expression/transpile-fluent-inline-expression-node-to-js-lines';
import { transpileFluentPatternNodeToJSLines } from '../pattern/transpile-fluent-pattern-node-to-js-lines';
import { SELECT_NAME } from '../shared/select-name.constants';

export interface ITranspileFluentSelectExpressionNodeToJSLinesOptions {
  selectExpressionNode: SelectExpression;
}

export function transpileFluentSelectExpressionNodeToJSLines(
  {
    selectExpressionNode,
    ...options
  }: ITranspileFluentSelectExpressionNodeToJSLinesOptions,
): ILines {
  return [
    `${SELECT_NAME}(`,
    ...indentLines([
      ...inlineLastLines(
        transpileFluentInlineExpressionNodeToJSLines({
          ...options,
          inlineExpressionNode: selectExpressionNode.selector,
        }),
        [','],
      ),
      ...inlineLastLines(
        wrapLinesWithSquareBrackets(
          selectExpressionNode.variants.flatMap((variant: Variant): ILines => {
            return inlineLastLines(
              transpileFluentSelectExpressionVariantNodeToJSLines({
                ...options,
                variantNode: variant,
              }),
              [','],
            );
          }),
        ),
        [','],
      ),
    ]),
    `)`,
  ];
}

/*---*/

export interface ITranspileFluentSelectExpressionVariantNodeToJSLinesOptions {
  variantNode: Variant;
}

export function transpileFluentSelectExpressionVariantNodeToJSLines(
  {
    variantNode,
    ...options
  }: ITranspileFluentSelectExpressionVariantNodeToJSLinesOptions,
): ILines {
  return [
    ...wrapLinesWithSquareBrackets([
      ...inlineLastLines(
        transpileFluentSelectExpressionVariantKeyNodeToJSLines({
          ...options,
          variantKeyNode: variantNode.key,
        }),
        [','],
      ),
      ...inlineLastLines(
        [
          `() => {`,
          ...indentLines([
            `return (`,
            ...indentLines(
              transpileFluentPatternNodeToJSLines({
                ...options,
                patternNode: variantNode.value,
              }),
            ),
            `);`,
          ]),
          `}`,
        ],
        [','],
      ),
      ...(
        variantNode.default
          ? [`true,`]
          : []
      ),
    ]),
  ];
}

export interface ITranspileFluentSelectExpressionVariantKeyNodeToJSLinesOptions {
  variantKeyNode: Identifier | NumberLiteral;
}

export function transpileFluentSelectExpressionVariantKeyNodeToJSLines(
  {
    variantKeyNode,
    ...options
  }: ITranspileFluentSelectExpressionVariantKeyNodeToJSLinesOptions,
): ILines {
  if (isIdentifierNode(variantKeyNode)) {
    return [
      `${JSON.stringify(variantKeyNode.name)}`,
    ];
  } else if (isNumberLiteralNode(variantKeyNode)) {
    return [
      `${variantKeyNode.value}`,
    ];
  } else {
    throw new Error(`Unknown Node: ${(variantKeyNode as any).type}`);
  }
}

