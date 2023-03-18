import { createFluentRegisterAndRenderMessageFunctions } from '../message/create-fluent-register-and-render-message-functions';
import { createFluentRegisterAndRenderTermFunctions } from '../term/create-fluent-register-and-render-term-functions';
import { IFluentResourceOptions } from './fluent-resource-function.type';

export function createFluentResourceFunctionOptions(): IFluentResourceOptions {
  return {
    ...createFluentRegisterAndRenderMessageFunctions(),
    ...createFluentRegisterAndRenderTermFunctions(),
  };
}
