export function arrayToString(
  input: readonly string[],
  separator: string = ','
): string {
  return input.join(separator);
}
