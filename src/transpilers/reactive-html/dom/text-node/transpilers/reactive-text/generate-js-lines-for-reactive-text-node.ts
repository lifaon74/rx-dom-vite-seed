import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForReactiveTextNodeOptions extends IHavingPrimaryTranspilersOptions {
  value: string;
}

export function generateJSLinesForReactiveTextNode(
  {
    value,
    transpilers,
  }: IGenerateJSLinesForReactiveTextNodeOptions,
): ILines {

  const {
    transpileAttachNodeToJSLines,
    transpileCreateReactiveTextNodeToJSLines,
    transpileToObservableToJSLines,
  } = transpilers;

  return [
    `// reactive text node`,
    ...transpileAttachNodeToJSLines({
      node: transpileCreateReactiveTextNodeToJSLines({
        value: transpileToObservableToJSLines({ value: [value] }),
      }),
      parentNode: ['parentNode'],
    }),
  ];
}
