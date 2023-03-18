import { IFluentPluralRulesSelectFunction } from '../call-function/built-in/plural-rules/fluent-plural-rules-select-function.type';
import { IFluentSelectEntry, IFluentSelectEntryValue, IFluentSelectFunction } from './fluent-select-function.type';

export interface ICreateFluentSelectFunctionOptions {
  fluentPluralRulesSelect: IFluentPluralRulesSelectFunction;
}

export function createFluentSelectFunction(
  {
    fluentPluralRulesSelect,
  }: ICreateFluentSelectFunctionOptions,
): IFluentSelectFunction {
  return (
    value: unknown,
    entries: readonly IFluentSelectEntry[],
  ): string => {
    const length: number = entries.length;
    let defaultFnc!: IFluentSelectEntryValue;

    for (let i = 0; i < length; i++) {
      const [key, fnc, isDefault]: IFluentSelectEntry = entries[i];
      if (value === key) {
        return fnc();
      }
      if (isDefault) {
        defaultFnc = fnc;
      }
    }

    if (typeof value === 'number') {
      const _value: string = fluentPluralRulesSelect(value);
      for (let i = 0; i < length; i++) {
        const [key, fnc]: IFluentSelectEntry = entries[i];
        if (_value === key) {
          return fnc();
        }
      }
    }

    return defaultFnc();
  };
}

