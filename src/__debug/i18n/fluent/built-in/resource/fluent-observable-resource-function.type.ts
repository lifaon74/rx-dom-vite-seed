import {
  IFluentObservableRegisterAndRenderMessageFunctions,
} from '../message/create-fluent-observable-register-and-render-message-functions';
import { IFluentObservableRegisterAndRenderTermFunctions } from '../term/create-fluent-observable-register-and-render-term-functions';

export interface IFluentObservableResourceOptions extends //
  IFluentObservableRegisterAndRenderMessageFunctions,
  IFluentObservableRegisterAndRenderTermFunctions
//
{
}

export interface IFluentObservableResourceFunction {
  (
    options: IFluentObservableResourceOptions,
  ): void;
}
