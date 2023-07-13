import { ObservableDateTimeFormat } from '../../date-time/observable/observable-date-time-format.class';
import { ObservableListFormat } from '../../list/observable/observable-number-format.class';
import { ObservableNumberFormat } from '../../number/observable/observable-number-format.class';
import { ObservablePluralRules } from '../../plural-rules/observable/observable-plural-rules.class';
import { IObservableTranslateFunctionFunctions } from './types/observable-translate-function-functions.type';

export const DEFAULT_OBSERVABLE_TRANSLATE_FUNCTION_FUNCTIONS = {
  numberFormat: new ObservableNumberFormat().format,
  dateTimeFormat: new ObservableDateTimeFormat().format,
  listFormat: new ObservableListFormat().format,
  pluralRulesSelect: new ObservablePluralRules().select,
} satisfies IObservableTranslateFunctionFunctions;
