export function convertTransitionDurationToMs(
  transitionDuration: string,
): number {
  if (transitionDuration.endsWith('ms')) {
    return Number(transitionDuration.slice(0, -2));
  } else if (transitionDuration.endsWith('s')) {
    return (Number(transitionDuration.slice(0, -1)) * 1000);
  } else if (transitionDuration === '') {
    return 0;
  } else {
    throw new Error(`Invalid duration`);
  }
}

export function convertMultipleTransitionDurationsToMs(
  transitionDurations: string,
): number[] {
  return transitionDurations
    .split(',')
    .map((transitionDuration: string): number => {
      return convertTransitionDurationToMs(transitionDuration.trim());
    });
}
