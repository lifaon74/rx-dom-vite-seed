import { IAttributeValueOrNull } from '../../../../../../../light-dom/attribute/attribute-value.type';
import { getAttributeValue } from '../../../../../../../light-dom/attribute/get-attribute-value';
import { ILinesOrNull } from '../../../../../../types/lines.type';

export function getTagTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToJSLines(node: Element): ILinesOrNull {
  const value: IAttributeValueOrNull = getAttributeValue(node, 'let-value');
  return (value === null)
    ? null
    : (
      ((value === '') || (value === 'value'))
        ? [`{ value }`]
        : [`{ value: ${value} }`]
    );
}
