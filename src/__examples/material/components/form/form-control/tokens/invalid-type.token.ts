export const INVALID_TYPE_TOKEN = Symbol('INVALID_TYPE');

export type IInvalidTypeToken = typeof INVALID_TYPE_TOKEN;

export type IValueOrInvalidTypeToken<GValue> =
  | GValue
  | IInvalidTypeToken
  ;
