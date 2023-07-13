import { IObservable } from '@lirx/core';
import { IFluentObservableMessageFunction, IFluentObservableMessageOptions } from './fluent-observable-message-function.type';
import { IFluentObservableMessagesMap } from './map/fluent-observable-messages-map.type';
import { IFluentObservableRegisterMessageFunction } from './register/fluent-observable-register-message-function.type';
import { IFluentObservableRenderMessageFunction } from './render/fluent-observable-render-message-function.type';

export interface IFluentObservableRegisterAndRenderMessageFunctions {
  messages: IFluentObservableMessagesMap;
  registerMessage: IFluentObservableRegisterMessageFunction;
  renderMessage: IFluentObservableRenderMessageFunction;
}

export function createFluentObservableRegisterAndRenderMessageFunctions(): IFluentObservableRegisterAndRenderMessageFunctions {
  const messages: IFluentObservableMessagesMap = new Map<string, IFluentObservableMessageFunction>();

  const registerMessage: IFluentObservableRegisterMessageFunction = (
    key: string,
    fnc: IFluentObservableMessageFunction,
  ): void => {
    if (messages.has(key)) {
      throw new Error(`Message ${JSON.stringify(key)} already registered`);
    } else {
      messages.set(key, fnc);
    }
  };

  const renderMessage: IFluentObservableRenderMessageFunction = (
    key: string,
    options: IFluentObservableMessageOptions,
  ): IObservable<string> => {
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
