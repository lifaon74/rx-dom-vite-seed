export function float_to_string(
  a: number,
  precision: number = 0
): string {
  return (precision <= 0)
    ? a.toString(10)
    : a.toPrecision(precision).replace(/\.?0+$/g, '');
}
