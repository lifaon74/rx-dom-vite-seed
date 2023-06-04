export interface IHavingFormProperty {
  form: HTMLFormElement | null;
}

export function hasFormProperty<GValue>(
  value: GValue,
): value is (GValue & IHavingFormProperty) {
  return ('form' in (value as any));
}
