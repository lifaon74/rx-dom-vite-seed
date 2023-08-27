import { IFluentGetVariableFunction } from '../get-variable/fluent-get-variable-function.type';
import { IFluentTermFunction, IFluentTermOptions } from './fluent-term-function.type';
import { IFluentRegisterTermFunction } from './register/fluent-register-term-function.type';
import { IFluentRenderTermFunction, IFluentRenderTermFunctionEntry } from './render/fluent-render-term-function.type';

export interface IFluentRegisterAndRenderTermFunctions {
  registerTerm: IFluentRegisterTermFunction;
  renderTerm: IFluentRenderTermFunction;
}

export function createFluentRegisterAndRenderTermFunctions(): IFluentRegisterAndRenderTermFunctions {
  const map = new Map<string, IFluentTermFunction>();

  const registerTerm: IFluentRegisterTermFunction = (
    key: string,
    fnc: IFluentTermFunction,
  ): void => {
    if (map.has(key)) {
      throw new Error(`Term ${JSON.stringify(key)} already registered`);
    } else {
      map.set(key, fnc);
    }
  };

  const renderTerm: IFluentRenderTermFunction = (
    key: string,
    {
      getVariable,
      ...options
    }: IFluentTermOptions,
    entries: readonly IFluentRenderTermFunctionEntry[],
  ): string => {
    if (map.has(key)) {
      const _map = new Map<string, unknown>(entries);

      const _getVariable: IFluentGetVariableFunction = (
        key: string,
      ): unknown => {
        if (_map.has(key)) {
          return _map.get(key)!;
        } else {
          return getVariable(key);
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
