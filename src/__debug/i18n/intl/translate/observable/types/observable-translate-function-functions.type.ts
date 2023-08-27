import {
  IHavingObservableDateTimeFormatFunction
} from '../../../date-time/observable/types/having-observable-date-time-format-function.type';
import { IHavingObservableListFormatFunction } from '../../../list/observable/types/having-observable-list-format-function.type';
import { IHavingObservableNumberFormatFunction } from '../../../number/observable/types/having-observable-number-format-function.type';
import {
  IHavingObservablePluralRulesSelectFunction
} from '../../../plural-rules/observable/types/having-observable-plural-rules-select-function.type';
import { IGenericObservableFormatFunction } from '../../../types/generic-observable-format-function.type';

export interface IPrimaryObservableTranslateFunctionFunctions extends //
  IHavingObservableNumberFormatFunction,
  IHavingObservableDateTimeFormatFunction,
  IHavingObservableListFormatFunction,
  IHavingObservablePluralRulesSelectFunction
//
{
}

export interface IGenericObservableTranslateFunctionFunctions {
  [key: string]: IGenericObservableFormatFunction;
}

export interface IObservableTranslateFunctionFunctions extends IPrimaryObservableTranslateFunctionFunctions, IGenericObservableTranslateFunctionFunctions {
}

export type IPartialObservableTranslateFunctionFunctions = Partial<IObservableTranslateFunctionFunctions>;

