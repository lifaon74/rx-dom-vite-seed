import { IFluentRegisterAndRenderMessageFunctions } from '../message/create-fluent-register-and-render-message-functions';
import { IFluentRegisterAndRenderTermFunctions } from '../term/create-fluent-register-and-render-term-functions';

export interface IFluentResourceOptions extends //
  IFluentRegisterAndRenderMessageFunctions,
  IFluentRegisterAndRenderTermFunctions
//
{
}

export interface IFluentResourceFunction {
  (
    options: IFluentResourceOptions,
  ): void;
}
