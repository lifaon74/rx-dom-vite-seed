import { IObservable } from '@lirx/core';
import { IFluentGetVariableFunction } from '../get-variable/fluent-get-variable-function.type';
import { IFluentObservableTermFunction, IFluentObservableTermOptions } from './fluent-observable-term-function.type';
import { IFluentObservableRegisterTermFunction } from './register/fluent-observable-register-term-function.type';
import { IFluentObservableRenderTermFunction } from './render/fluent-observable-render-term-function.type';
import { IFluentRenderTermFunctionEntry } from './render/fluent-render-term-function.type';

export interface IFluentObservableRegisterAndRenderTermFunctions {
  registerTerm: IFluentObservableRegisterTermFunction;
  renderTerm: IFluentObservableRenderTermFunction;
}

export function createFluentObservableRegisterAndRenderTermFunctions(): IFluentObservableRegisterAndRenderTermFunctions {
  const map = new Map<string, IFluentObservableTermFunction>();

  const registerTerm: IFluentObservableRegisterTermFunction = (
    key: string,
    fnc: IFluentObservableTermFunction,
  ): void => {
    if (map.has(key)) {
      throw new Error(`Term ${JSON.stringify(key)} already registered`);
    } else {
      map.set(key, fnc);
    }
  };

  const renderTerm: IFluentObservableRenderTermFunction = (
    key: string,
    {
      getVariable,
      ...options
    }: IFluentObservableTermOptions,
    entries: readonly IFluentRenderTermFunctionEntry[],
  ): IObservable<string> => {
    if (map.has(key)) {
      const _map = new Map<string, unknown>(entries);

      const _getVariable: IFluentGetVariableFunction = (
        key: string,
      ): unknown => {
        if (_map.has(key)) {
          return _map.get(key)!;
        } else {
          return getVariable;
        }
      };

      return map.get(key)!({
        ...options,
        getVariable: _getVariable,
      });
    } else {
      throw new Error(`Missing term: ${JSON.stringify(key)}`);
    }
  };

  return {
    registerTerm,
    renderTerm,
  };
}
