import { convertMultipleTransitionDurationsToMs } from './convert-transition-duration-to-ms';

export function getTransitionDurationsOfElement(
  element: Element,
): number[] {
  return convertMultipleTransitionDurationsToMs(
    getComputedStyle(element)
      .getPropertyValue('transition-duration'),
  );
}

export function getLongestTransitionDurationOfElement(
  element: Element,
): number {
  return getTransitionDurationsOfElement(element).reduce((longestDuration: number, currentDuration: number): number => {
    return Math.max(longestDuration, currentDuration);
  }, 0);
}
