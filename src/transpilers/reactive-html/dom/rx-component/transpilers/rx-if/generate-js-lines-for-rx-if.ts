import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForRXIfOptions extends IHavingPrimaryTranspilersOptions {
  condition: string;
  templateTrue: string;
  templateFalse: string;
}

export function generateJSLinesForRXIf(
  {
    condition,
    templateTrue,
    templateFalse,
    transpilers,
  }: IGenerateJSLinesForRXIfOptions,
): ILines {
  const {
    transpileAttachNodeToJSLines,
    transpileCreateReactiveIfNodeToJSLines,
    transpileToObservableToJSLines,
  } = transpilers;

  return [
    `// reactive if node`,
    ...transpileAttachNodeToJSLines({
      node: transpileCreateReactiveIfNodeToJSLines({
        condition: transpileToObservableToJSLines({ value: [condition] }),
        templateTrue: [templateTrue],
        templateFalse: [templateFalse],
      }),
      parentNode: ['parentNode'],
    }),
  ];
}
