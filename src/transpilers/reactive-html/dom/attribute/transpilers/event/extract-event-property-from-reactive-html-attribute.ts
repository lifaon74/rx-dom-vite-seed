/**
 * Syntax:
 *  - standard: ($)?(name)
 *  - prefixed: on-(output-)?name
 */

export interface IEventProperty {
  readonly name: string;
  readonly value: string;
  readonly prefixMode: boolean;
  readonly outputMode: boolean;
}

/*--------*/

const EVENT_ATTRIBUTE_BRACKET_PATTERN: string = '(\\$?)\\(([^\\)]+)\\)';
const EVENT_ATTRIBUTE_PREFIX_PATTERN: string = 'on-(output-?)(.+)';
const EVENT_ATTRIBUTE_PATTERN: string = `(?:${EVENT_ATTRIBUTE_BRACKET_PATTERN})`
  + `|(?:${EVENT_ATTRIBUTE_PREFIX_PATTERN})`;
const EVENT_ATTRIBUTE_REGEXP: RegExp = new RegExp(`^${EVENT_ATTRIBUTE_PATTERN}$`);

export function extractEventPropertyFromReactiveHTMLAttribute(
  attribute: Attr,
): IEventProperty | null {
  const match: RegExpExecArray | null = EVENT_ATTRIBUTE_REGEXP.exec(attribute.name);
  if (match === null) {
    return null;
  } else {
    const prefixMode: boolean = (match[4] !== void 0);

    const value: string = attribute.value.trim();

    let name: string;
    let outputMode: boolean;

    if (prefixMode) {
      outputMode = match[3] !== '';
      name = match[4];
    } else {
      outputMode = match[1] !== '';
      name = match[2];
    }

    return {
      name,
      value,
      prefixMode,
      outputMode,
    };
  }
}




