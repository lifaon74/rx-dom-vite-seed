import { IFluentMessageFunction, IFluentMessageOptions } from './fluent-message-function.type';
import { IFluentRegisterMessageFunction } from './register/fluent-register-message-function.type';
import { IFluentRenderMessageFunction } from './render/fluent-render-message-function.type';

export interface IFluentRegisterAndRenderMessageFunctions {
  registerMessage: IFluentRegisterMessageFunction;
  renderMessage: IFluentRenderMessageFunction;
}

export function createFluentRegisterAndRenderMessageFunctions(): IFluentRegisterAndRenderMessageFunctions {
  const map = new Map<string, IFluentMessageFunction>();

  const registerMessage: IFluentRegisterMessageFunction = (
    key: string,
    fnc: IFluentMessageFunction,
  ): void => {
    if (map.has(key)) {
      throw new Error(`Message ${JSON.stringify(key)} already registered`);
    } else {
      map.set(key, fnc);
    }
  };

  const renderMessage: IFluentRenderMessageFunction = (
    key: string,
    options: IFluentMessageOptions,
  ): string => {
    if (map.has(key)) {
      return map.get(key)!(options);
    } else {
      throw new Error(`Missing message: ${JSON.stringify(key)}`);
    }
  };

  return {
    registerMessage,
    renderMessage,
  };
}
