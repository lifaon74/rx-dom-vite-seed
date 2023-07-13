import { IHavingDateTimeFormatFunction } from '../../../date-time/having-date-time-format-function.type';
import { IHavingListFormatFunction } from '../../../list/having-list-format-function.type';
import { IHavingNumberFormatFunction } from '../../../number/having-number-format-function.type';
import { IHavingPluralRulesSelectFunction } from '../../../plural-rules/having-plural-rules-select-function.type';
import { IGenericFormatFunction } from '../../../types/generic-format-function.type';

export interface IPrimaryTranslateFunctions extends //
  IHavingNumberFormatFunction,
  IHavingDateTimeFormatFunction,
  IHavingListFormatFunction,
  IHavingPluralRulesSelectFunction
//
{
}

export interface IGenericTranslateFunctions {
  [key: string]: IGenericFormatFunction;
}

export interface ITranslateFunctions extends IPrimaryTranslateFunctions, IGenericTranslateFunctions {
}

export type IPartialTranslateFunctions = Partial<ITranslateFunctions>;

