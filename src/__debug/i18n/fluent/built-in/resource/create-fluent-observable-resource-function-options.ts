import {
  createFluentObservableRegisterAndRenderMessageFunctions,
} from '../message/create-fluent-observable-register-and-render-message-functions';
import { createFluentObservableRegisterAndRenderTermFunctions } from '../term/create-fluent-observable-register-and-render-term-functions';
import { IFluentObservableResourceOptions } from './fluent-observable-resource-function.type';

export function createFluentObservableResourceFunctionOptions(): IFluentObservableResourceOptions {
  return {
    ...createFluentObservableRegisterAndRenderMessageFunctions(),
    ...createFluentObservableRegisterAndRenderTermFunctions(),
  };
}
