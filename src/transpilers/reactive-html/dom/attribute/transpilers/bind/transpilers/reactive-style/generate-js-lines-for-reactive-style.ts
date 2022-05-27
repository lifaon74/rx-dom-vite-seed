import { ILines } from '../../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForReactiveStyleOptions extends IHavingPrimaryTranspilersOptions {
  name: string;
  value: string;
}

export function generateJSLinesForReactiveStyle(
  {
    name,
    value,
    transpilers,
  }: IGenerateJSLinesForReactiveStyleOptions,
): ILines {
  const {
    transpileSetReactiveStylePropertyToJSLines,
    transpileToObservableToJSLines,
  } = transpilers;

  return [
    `// reactive style '${name}'`,
    ...transpileSetReactiveStylePropertyToJSLines({
      node: ['node'],
      name: [JSON.stringify(name)],
      value: transpileToObservableToJSLines({ value: [value] }),
    }),
  ];
}
