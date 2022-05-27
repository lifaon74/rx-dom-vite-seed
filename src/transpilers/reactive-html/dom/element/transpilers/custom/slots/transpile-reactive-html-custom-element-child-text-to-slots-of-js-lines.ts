import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import {
  ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap,
} from '../../../../../primary/transpilers/transpile-create-reactive-custom-element-node-to-js-lines.type';
import { transpileReactiveHTMLTextNodeToJSLines } from '../../../../text-node/transpile-reactive-html-text-node-to-js-lines';

export interface ITranspileReactiveHTMLCustomElementChildTextToSlotsOfJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Text;
  slots: ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap;
}

export function transpileReactiveHTMLCustomElementChildTextToSlotsOfJSLines(
  {
    node,
    slots,
    ...options
  }: ITranspileReactiveHTMLCustomElementChildTextToSlotsOfJSLinesOptions,
): void {
  const lines: ILinesOrNull = transpileReactiveHTMLTextNodeToJSLines({
    ...options,
    node: node as Text,
  });
  if (lines !== null) {
    slots.get('*')!.push(...lines);
  }
}
