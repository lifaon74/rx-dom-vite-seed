export function compareByIdentity<GItem>(
  itemA: GItem,
  itemB: GItem,
): boolean {
  return itemA === itemB;
}
