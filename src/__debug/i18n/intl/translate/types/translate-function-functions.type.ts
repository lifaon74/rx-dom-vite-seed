import { IHavingDateTimeFormatFunction } from '../../date-time/types/having-date-time-format-function.type';
import { IHavingListFormatFunction } from '../../list/types/having-list-format-function.type';
import { IHavingNumberFormatFunction } from '../../number/types/having-number-format-function.type';
import { IHavingPluralRulesSelectFunction } from '../../plural-rules/types/having-plural-rules-select-function.type';
import { IGenericFormatFunction } from '../../types/generic-format-function.type';

export interface IPrimaryTranslateFunctionFunctions extends //
  IHavingNumberFormatFunction,
  IHavingDateTimeFormatFunction,
  IHavingListFormatFunction,
  IHavingPluralRulesSelectFunction
//
{
}

export interface IGenericTranslateFunctionFunctions {
  [key: string]: IGenericFormatFunction;
}

export interface ITranslateFunctionFunctions extends IPrimaryTranslateFunctionFunctions, IGenericTranslateFunctionFunctions {
}

export type IPartialTranslateFunctionFunctions = Partial<ITranslateFunctionFunctions>;
