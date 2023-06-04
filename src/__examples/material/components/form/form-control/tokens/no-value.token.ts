export const NO_VALUE_TOKEN = Symbol('NO_VALUE');

export type INoValueToken = typeof NO_VALUE_TOKEN;

export type IValueOrNoValueToken<GValue> =
  | GValue
  | INoValueToken
  ;
