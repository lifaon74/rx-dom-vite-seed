export function createMissingAttributeError(
  attributeName: string,
  elementName: string,
): Error {
  return new Error(`Missing attribute '${attributeName}' for '${elementName}'`);
}
