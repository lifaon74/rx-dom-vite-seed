import { ILines } from '../../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForReactiveClassNamesListOptions extends IHavingPrimaryTranspilersOptions {
  value: string;
}

export function generateJSLinesForReactiveClassNamesList(
  {
    value,
    transpilers,
  }: IGenerateJSLinesForReactiveClassNamesListOptions,
): ILines {
  const {
    transpileSetReactiveClassNamesListToJSLines,
    transpileToObservableToJSLines,
  } = transpilers;

  return [
    `// reactive class names list`,
    ...transpileSetReactiveClassNamesListToJSLines({
      node: ['node'],
      value: transpileToObservableToJSLines({ value: [value] }),
    }),
  ];
}
