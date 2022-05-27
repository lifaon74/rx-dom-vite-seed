import { dashCaseToCamelCase } from '../../../../../../misc/case-converters/dash-case';
import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { throwIfHasChildNodes } from '../../../../../../misc/dom/throw-if-has-child-nodes';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { generateTemplateVariableName } from '../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { extractLetPropertyFromReactiveHTMLAttribute, ILetProperty } from '../helpers/extract-let-property-from-reactive-html-attribute';

/*
Syntax:

<rx-inject-template
  template="templateReference"
  let-var1="data1"
  let-var2="data2"
></rx-inject-template>

 */

const TAG_NAME: string = 'rx-inject-template';

const TEMPLATE_ATTRIBUTE_NAME: string = 'template';

export interface ITranspileReactiveHTMLRXInjectTemplateToLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXInjectTemplateToLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXInjectTemplateToLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    let templateName!: string;
    const letProperties: ILetProperty[] = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];
      const letProperty: ILetProperty | null = extractLetPropertyFromReactiveHTMLAttribute(attribute);
      if (letProperty === null) {
        if (attribute.name === TEMPLATE_ATTRIBUTE_NAME) {
          if (templateName === void 0) {
            templateName = attribute.value;
          } else {
            throw new Error(`Found duplicate template name through attribute '${TEMPLATE_ATTRIBUTE_NAME}'`);
          }
        } else {
          throw new Error(`Found invalid attribute '${attribute.name}'`);
        }
      } else {
        letProperties.push(letProperty);
      }
    }

    throwIfHasChildNodes(node);

    const letPropertiesLines: ILines = inlineLastLines(
      wrapLinesWithCurlyBrackets(
        letProperties.map((letProperty: ILetProperty): string => {
          const name: string = dashCaseToCamelCase(letProperty.name);
          const value: string = letProperty.value;
          if (value === '') {
            throw new Error(`The let property '${letProperty.name}' of ${TAG_NAME} must have a value`);
          } else {
            return ((value === name) || (value === ''))
              ? `${name},`
              : `${name}: ${value},`;
          }
        }),
        false,
      ),
      [','],
    );

    return [
      `// inject template`,
      `${generateTemplateVariableName(templateName)}(`,
      ...indentLines([
        `parentNode,`,
        ...letPropertiesLines,
      ]),
      `);`,
    ];
  } else {
    return null;
  }
}

