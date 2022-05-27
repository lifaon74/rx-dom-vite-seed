import { dashCaseToCamelCase } from '../../../../../../misc/case-converters/dash-case';
import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { generateTemplateVariableName } from '../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLNodesToJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-js-lines';
import { extractLetPropertyFromReactiveHTMLAttribute, ILetProperty } from '../helpers/extract-let-property-from-reactive-html-attribute';
import { generateJSLinesForRXTemplate } from './generate-js-lines-for-rx-template';

/*
Syntax:

<rx-template
  name="templateReference"
  let-var1
  let-var2
>
  ...content
</rx-template>

 */

const TEMPLATE_NAME_ATTRIBUTE_NAME: string = 'name';

export interface ITranspileReactiveHTMLRXTemplateToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXTemplateToJSLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXTemplateToJSLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === 'rx-template') {
    let templateName!: string;
    const letProperties: ILetProperty[] = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];

      const letProperty: ILetProperty | null = extractLetPropertyFromReactiveHTMLAttribute(attribute);
      if (letProperty === null) {
        if (attribute.name === TEMPLATE_NAME_ATTRIBUTE_NAME) {
          if (templateName === void 0) {
            templateName = attribute.value;
          } else {
            throw new Error(`Found duplicate template name through attribute '${TEMPLATE_NAME_ATTRIBUTE_NAME}'`);
          }
        } else {
          throw new Error(`Found invalid attribute '${attribute.name}'`);
        }
      } else {
        letProperties.push(letProperty);
      }
    }

    if (templateName === void 0) {
      throw new Error(`Missing a name for this template`);
    }

    const letPropertiesLines: ILinesOrNull = (letProperties.length === 0)
      ? null
      : inlineLastLines(
        wrapLinesWithCurlyBrackets(
          letProperties.map((letProperty: ILetProperty): string => {
            const name: string = dashCaseToCamelCase(letProperty.name);
            const value: string = letProperty.value;
            return ((value === name) || (value === ''))
              ? `${name},`
              : `${name}: ${value},`;
          }),
          false,
        ),
        [','],
      );

    const transpiledChildren: ILinesOrNull = transpileReactiveHTMLNodesToJSLines({
      ...options,
      nodes: node.childNodes,
    });

    return [
      `// template`,
      `const ${generateTemplateVariableName(templateName)} = (`,
      ...indentLines(
        generateJSLinesForRXTemplate({
          ...options,
          argumentsLines: letPropertiesLines,
          bodyLines: transpiledChildren,
        }),
      ),
      `);`,
    ];
  } else {
    return null;
  }
}


