import {
  IFluentObservableRegisterAndRenderMessageFunctions,
} from '../../message/observable/create-fluent-observable-register-and-render-message-functions';
import { IFluentObservableRegisterAndRenderTermFunctions } from '../../term/observable/create-fluent-observable-register-and-render-term-functions';

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
