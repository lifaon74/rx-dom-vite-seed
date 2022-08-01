export function compareStrings(
  a: string,
  b: string,
): number {
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else {
    return 1;
  }
}

export function compareStringsInsensitive(
  a: string,
  b: string,
): number {
  return compareStrings(
    a.toLowerCase(),
    b.toLowerCase(),
  );
}
