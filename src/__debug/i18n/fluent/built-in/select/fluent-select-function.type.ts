
export type IFluentSelectValue =
  | string
  | number
;

export interface IFluentSelectEntryValue {
  (): string;
}

export type IFluentSelectEntry = readonly [
  key: IFluentSelectValue,
  value: IFluentSelectEntryValue,
  isDefault?: boolean,
];

export interface IFluentSelectFunction {
  (
    value: IFluentSelectValue,
    entries: readonly IFluentSelectEntry[],
  ): string;
}


