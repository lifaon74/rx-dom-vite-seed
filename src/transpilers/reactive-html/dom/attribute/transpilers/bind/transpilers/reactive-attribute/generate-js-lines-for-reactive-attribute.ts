import { ILines } from '../../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForReactiveAttributeOptions extends IHavingPrimaryTranspilersOptions {
  name: string;
  value: string;
}

export function generateJSLinesForReactiveAttribute(
  {
    name,
    value,
    transpilers,
  }: IGenerateJSLinesForReactiveAttributeOptions,
): ILines {
  const {
    transpileSetReactiveAttributeToJSLines,
    transpileToObservableToJSLines,
  } = transpilers;

  return [
    `// reactive attribute '${name}'`,
    ...transpileSetReactiveAttributeToJSLines({
      node: ['node'],
      name: [JSON.stringify(name)],
      value: transpileToObservableToJSLines({ value: [value] }),
    }),
  ];
}
