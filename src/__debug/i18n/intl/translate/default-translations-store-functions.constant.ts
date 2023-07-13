import { createDateTimeFormatFunction } from '../date-time/create-date-time-format-function';
import { createListFormatFunction } from '../list/create-list-format-function';
import { createNumberFormatFunction } from '../number/create-number-format-function';
import { createPluralRulesSelectFunction } from '../plural-rules/create-plural-rules-select-function';
import { ITranslateFunctions } from './types/translate-function/translate-functions.type';

export const DEFAULT_TRANSLATIONS_STORE_FUNCTIONS = {
  numberFormat: createNumberFormatFunction(),
  dateTimeFormat: createDateTimeFormatFunction(),
  listFormat: createListFormatFunction(),
  pluralRulesSelect: createPluralRulesSelectFunction(),
} satisfies ITranslateFunctions;
