import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { throwIfHasChildNodes } from '../../../../../../misc/dom/throw-if-has-child-nodes';
import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { generateTemplateVariableName } from '../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateJSLinesForLocalTemplateFromRXContainerElement,
} from '../helpers/generate-js-lines-for-local-template-from-rx-container-element';
import { extractRXForLoopCommand, IRXForLoopCommand } from './extract-rx-for-loop-command';
import { generateJSLinesForRXForLoop } from './generate-js-lines-for-rx-for-loop';

/*
Syntax:

<rx-for-loop
  items="itemsObservable"
  template="templateReference"
  track-by="trackByFunction"
></rx-for-loop>

 */

/*
Syntax - alternative:

<element
  *for="let item of items; index as index; trackBy: trackByFn"
>
  ...content
</element>

====> equivalent

<rx-template
  name="uuid"
>
  ...content
</rx-template>
<rx-for-loop
  items="items"
  template="uuid"
  track-by="trackByFn"
></rx-for-loop>

 */

const TAG_NAME: string = 'rx-for-loop';
const COMMAND_NAME: string = '*for';

const ITEMS_ATTRIBUTE_NAME: string = 'items';
const TEMPLATE_ATTRIBUTE_NAME: string = 'template';
const TRACK_BY_ATTRIBUTE_NAME: string = 'track-by';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  ITEMS_ATTRIBUTE_NAME,
  TEMPLATE_ATTRIBUTE_NAME,
  TRACK_BY_ATTRIBUTE_NAME,
]);

export interface ITranspileReactiveHTMLRXForLoopToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

// export function compileRXForLoop(
export function transpileReactiveHTMLRXForLoopToJSLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXForLoopToJSLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const items: string | undefined = attributes.get(ITEMS_ATTRIBUTE_NAME);
    const template: string | undefined = attributes.get(TEMPLATE_ATTRIBUTE_NAME);
    const trackBy: string | undefined = attributes.get(TRACK_BY_ATTRIBUTE_NAME);

    if (items === void 0) {
      throw new Error(`Missing attribute '${ITEMS_ATTRIBUTE_NAME}'`);
    }

    if (template === void 0) {
      throw new Error(`Missing attribute '${TEMPLATE_ATTRIBUTE_NAME}'`);
    }

    throwIfHasChildNodes(node);

    return generateJSLinesForRXForLoop({
      ...options,
      items,
      template: generateTemplateVariableName(template),
      trackBy,
    });
  } else if (node.hasAttribute(COMMAND_NAME)) {
    const command: IRXForLoopCommand = extractRXForLoopCommand(node.getAttribute(COMMAND_NAME) as string);
    node.removeAttribute(COMMAND_NAME);

    const templateVariablesLines: ILines = [
      (command.item === 'item')
        ? `item,`
        : `item: ${command.item},`,
    ];

    if (command.index !== void 0) {
      templateVariablesLines.push(
        (command.index === 'index')
          ? `index,`
          : `index: ${command.index},`,
      );
    }

    return wrapLinesWithCurlyBrackets([
      ...generateJSLinesForLocalTemplateFromRXContainerElement({
          ...options,
          node,
          templateName: LOCAL_TEMPLATE_NAME,
          argumentsLines: wrapLinesWithCurlyBrackets(templateVariablesLines, false),
        },
      ),
      ...generateJSLinesForRXForLoop(
        {
          ...options,
          items: command.items,
          template: LOCAL_TEMPLATE_NAME,
          trackBy: command.trackBy,
        },
      ),
    ], false);
  } else {
    return null;
  }
}

