import { DateTimeFormat } from '../date-time/date-time-format.class';
import { ListFormat } from '../list/create-list-format-function';
import { NumberFormat } from '../number/number-format.class';
import { PluralRules } from '../plural-rules/plural-rules.class';
import { ITranslateFunctionFunctions } from './types/translate-function-functions.type';

export const DEFAULT_TRANSLATE_FUNCTION_FUNCTIONS = {
  numberFormat: new NumberFormat().format,
  dateTimeFormat: new DateTimeFormat().format,
  listFormat: new ListFormat().format,
  pluralRulesSelect: new PluralRules().select,
} satisfies ITranslateFunctionFunctions;
