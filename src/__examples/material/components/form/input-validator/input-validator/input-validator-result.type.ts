export type IInputValidatorValidResult = readonly [];

export type IInputValidatorErrorResult = readonly [
  string,
  ...string[],
];

export type IInputValidatorResult =
  | IInputValidatorValidResult
  | IInputValidatorErrorResult
  ;

