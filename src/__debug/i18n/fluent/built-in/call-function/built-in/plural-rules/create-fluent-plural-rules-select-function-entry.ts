import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { FLUENT_PLURAL_RULES_FUNCTION_NAME } from './fluent-plural-rules-function-name.constant';
import { IFluentPluralRulesSelectFunction } from './fluent-plural-rules-select-function.type';

export function createFluentPluralRulesSelectFunctionEntry(
  fluentPluralRulesSelect: IFluentPluralRulesSelectFunction,
): IFluentCallFunctionEntry {
  return [
    FLUENT_PLURAL_RULES_FUNCTION_NAME,
    fluentPluralRulesSelect,
  ];
}
