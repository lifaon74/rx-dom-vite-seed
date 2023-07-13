import { IObservable } from '@lirx/core';

export interface IGenericObservableFormatFunction {
  (...args: any[]): IObservable<string>;
}
