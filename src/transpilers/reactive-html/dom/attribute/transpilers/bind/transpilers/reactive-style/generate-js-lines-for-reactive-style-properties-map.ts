import { ILines } from '../../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForReactiveStylePropertiesMapOptions extends IHavingPrimaryTranspilersOptions {
  value: string;
}

export function generateJSLinesForReactiveStylePropertiesMap(
  {
    value,
    transpilers,
  }: IGenerateJSLinesForReactiveStylePropertiesMapOptions,
): ILines {
  const {
    transpileSetReactiveStylePropertiesMapToJSLines,
    transpileToObservableToJSLines,
  } = transpilers;

  return [
    `// reactive style properties map`,
    ...transpileSetReactiveStylePropertiesMapToJSLines({
      node: ['node'],
      value: transpileToObservableToJSLines({ value: [value] }),
    }),
  ];
}
