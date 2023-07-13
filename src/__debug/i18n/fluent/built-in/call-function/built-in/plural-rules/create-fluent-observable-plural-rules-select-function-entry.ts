import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentObservablePluralRulesSelectFunction } from './fluent-observable-plural-rules-select-function.type';
import { FLUENT_PLURAL_RULES_FUNCTION_NAME } from './fluent-plural-rules-function-name.constant';
import { IFluentPluralRulesSelectFunction } from './fluent-plural-rules-select-function.type';

export function createFluentObservablePluralRulesSelectFunctionEntry(
  fluentPluralRulesSelect: IFluentObservablePluralRulesSelectFunction,
): IFluentCallFunctionEntry {
  return [
    FLUENT_PLURAL_RULES_FUNCTION_NAME,
    fluentPluralRulesSelect,
  ];
}
