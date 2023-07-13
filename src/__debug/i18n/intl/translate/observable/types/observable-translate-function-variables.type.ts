import { IObservable, IObservableLike } from '@lirx/core';
import { ITranslateFunctionVariables, ITranslateFunctionVariableType } from '../../types/translate-function-variables.type';

export type IObservableTranslateFunctionVariables = Record<string, IObservable<ITranslateFunctionVariableType>>;

export type IObservableTranslateFunctionVariablesLike = Record<string, IObservableLike<ITranslateFunctionVariableType>>;
