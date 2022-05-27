export function createSlotAlreadyExistsError(
  slotName: string,
): Error {
  return new Error(`The slot '${slotName}' is already defined`);
}
