export interface IFluentSelectEntryValue {
  (): string;
}

export type IFluentSelectEntry = readonly [
  key: string | number,
  value: IFluentSelectEntryValue,
  isDefault?: boolean,
];

export interface IFluentSelectFunction {
  (
    value: unknown,
    entries: readonly IFluentSelectEntry[],
  ): string;
}


