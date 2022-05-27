import { toObservableThrowIfUndefined } from '../../misc/to-observable';
import { indentLines } from '../../transpilers/misc/lines/functions/indent-lines';
import { linesOrNullToLines } from '../../transpilers/misc/lines/functions/lines-or-null-to-lines';
import { linesToString } from '../../transpilers/misc/lines/functions/lines-to-string';
import { ILines } from '../../transpilers/misc/lines/lines.type';
import {
  ITranspileReactiveHTMLToJSLinesOptions,
  transpileReactiveHTMLToJSLines,
} from '../../transpilers/reactive-html/html/transpile-reactive-html-to-js-lines';

import {
  PRIMARY_TRANSPILERS_FOR_VIRTUAL_NODE_CONSTANT,
} from '../../transpilers/reactive-html/primary/virtual-node/primary-transpilers-for-virtual-node.constant';
import {
  IGenericGenericVirtualCustomElementNode,
} from '../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { VirtualReactiveElementNode } from '../../virtual-node/dom/nodes/reactive/element/virtual-reactive-element-node.class';
import { VirtualReactiveForLoopNode } from '../../virtual-node/dom/nodes/reactive/for-loop/virtual-reactive-for-loop-node.class';
import { VirtualReactiveIfNode } from '../../virtual-node/dom/nodes/reactive/if/virtual-reactive-if-node.class';
import { VirtualReactiveSwitchNode } from '../../virtual-node/dom/nodes/reactive/switch/virtual-reactive-switch-node.class';
import { VirtualReactiveTextNode } from '../../virtual-node/dom/nodes/reactive/text/virtual-reactive-text-node.class';
import { VirtualTextNode } from '../../virtual-node/dom/nodes/static/text/virtual-text-node';
import { IGenericComponent } from '../types/component.type';
import { IComponentTemplate} from '../create/create-component';

const DEFAULT_VALUES_TO_IMPORT = {
  VirtualTextNode,
  VirtualReactiveElementNode,
  VirtualReactiveTextNode,
  VirtualReactiveIfNode,
  VirtualReactiveSwitchNode,
  VirtualReactiveForLoopNode,
  toObservableThrowIfUndefined,
};

export interface ICompileReactiveHTMLAsComponentTemplateOptions extends Omit<ITranspileReactiveHTMLToJSLinesOptions, 'transpilers'> {
  html: string;
  customElements?: readonly IGenericComponent[];
}

export function compileReactiveHTMLAsComponentTemplate<GData extends object>(
  {
    html,
    customElements = [],
    ...options
  }: ICompileReactiveHTMLAsComponentTemplateOptions,
): IComponentTemplate<GData> {

  const customElementsMap = new Map<string, IGenericComponent>(
    customElements.map((customElement: IGenericComponent): [string, IGenericComponent] => {
      return [customElement.name, customElement];
    }),
  );

  const toImport = [
    ...Object.keys(DEFAULT_VALUES_TO_IMPORT),
    `createCustomElement`,
  ];

  const importLines: ILines = [
    `{`,
    ...indentLines(
      Array.from(toImport.values(), (value): string => {
        return `${value},`;
      }),
    ),
    `},`,
  ];

  const lines = [
    `(`,
    ...indentLines([
      ...importLines,
      `parentNode,`,
      `$,`,
      `slots,`,
    ]),
    `) => {`,
    ...indentLines(
      linesOrNullToLines(
        transpileReactiveHTMLToJSLines({
          ...options,
          html,
          transpilers: PRIMARY_TRANSPILERS_FOR_VIRTUAL_NODE_CONSTANT,
        }),
      ),
    ),
    `}`,
  ];

  const createCustomElement = (
    name: string,
    slots: any,
  ): IGenericGenericVirtualCustomElementNode => {
    if (customElementsMap.has(name)) {
      return customElementsMap.get(name)!.create(slots);
    } else {
      throw new Error(`Missing import of custom element '${name}'`);
    }
  };

  const compiledReactiveHTML: string = linesToString(lines);

  // console.log(compiledReactiveHTML);

  const fnc = new Function(
    '...a',
    `return(${compiledReactiveHTML})(...a);`,
  ) as any;

  const valuesToImport = {
    ...DEFAULT_VALUES_TO_IMPORT,
    createCustomElement,
  };

  return (...args: any[]): void => {
    return fnc(valuesToImport, ...args);
  };
}


