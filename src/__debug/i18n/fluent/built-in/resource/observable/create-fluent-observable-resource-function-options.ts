import {
  createFluentObservableRegisterAndRenderMessageFunctions,
} from '../../message/observable/create-fluent-observable-register-and-render-message-functions';
import { createFluentObservableRegisterAndRenderTermFunctions } from '../../term/observable/create-fluent-observable-register-and-render-term-functions';
import { IFluentObservableResourceOptions } from './fluent-observable-resource-function.type';

export function createFluentObservableResourceFunctionOptions(): IFluentObservableResourceOptions {
  return {
    ...createFluentObservableRegisterAndRenderMessageFunctions(),
    ...createFluentObservableRegisterAndRenderTermFunctions(),
  };
}
