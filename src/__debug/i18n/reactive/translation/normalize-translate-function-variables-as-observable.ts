import { single } from '@lirx/core';
import { createTranslateFunctionVariablesAsObservableFromObject } from './create-translate-function-variables-as-observable-from-object';
import {
  ITranslateFunctionVariables,
  ITranslateFunctionVariablesAsObservable,
  ITranslateFunctionVariablesAsObservableValue,
} from './translate-function.type';

export function normalizeTranslateFunctionVariablesAsObservable(
  variables$: ITranslateFunctionVariables | undefined,
): ITranslateFunctionVariablesAsObservable {
  if (typeof variables$ === 'undefined') {
    return single<ITranslateFunctionVariablesAsObservableValue>([]);
  } else if (
    (typeof variables$ === 'object')
    && (variables$ !== null)
  ) {
    return createTranslateFunctionVariablesAsObservableFromObject(variables$);
  } else if (typeof variables$ === 'function') {
    return variables$;
  } else {
    throw new Error(`Invalid variables$ type`);
  }
}
