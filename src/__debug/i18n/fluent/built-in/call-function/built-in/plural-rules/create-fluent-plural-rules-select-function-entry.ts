import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentPluralRulesSelectFunction } from './fluent-plural-rules-select-function.type';

export function createFluentPluralRulesSelectFunctionEntry(
  fluentPluralRulesSelect: IFluentPluralRulesSelectFunction,
): IFluentCallFunctionEntry {
  return [
    'PLURAL_RULES',
    fluentPluralRulesSelect,
  ];
}
