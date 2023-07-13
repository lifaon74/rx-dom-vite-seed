import { IFluentMessageFunction, IFluentMessageOptions } from './fluent-message-function.type';
import { IFluentMessagesMap } from './map/fluent-messages-map.type';
import { IFluentRegisterMessageFunction } from './register/fluent-register-message-function.type';
import { IFluentRenderMessageFunction } from './render/fluent-render-message-function.type';

export interface IFluentRegisterAndRenderMessageFunctions {
  messages: IFluentMessagesMap;
  registerMessage: IFluentRegisterMessageFunction;
  renderMessage: IFluentRenderMessageFunction;
}

export function createFluentRegisterAndRenderMessageFunctions(): IFluentRegisterAndRenderMessageFunctions {
  const messages: IFluentMessagesMap = new Map<string, IFluentMessageFunction>();

  const registerMessage: IFluentRegisterMessageFunction = (
    key: string,
    fnc: IFluentMessageFunction,
  ): void => {
    if (messages.has(key)) {
      throw new Error(`Message ${JSON.stringify(key)} already registered`);
    } else {
      messages.set(key, fnc);
    }
  };

  const renderMessage: IFluentRenderMessageFunction = (
    key: string,
    options: IFluentMessageOptions,
  ): string => {
    if (messages.has(key)) {
      return messages.get(key)!(options);
    } else {
      throw new Error(`Missing message: ${JSON.stringify(key)}`);
    }
  };

  return {
    messages,
    registerMessage,
    renderMessage,
  };
}
