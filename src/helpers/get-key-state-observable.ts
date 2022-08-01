import {
  filter$$,
  fromEventTarget, IObservable, map$$, merge
} from '@lirx/core';

export function getKeyState$$(
  target: EventTarget,
  key: string,
): IObservable<boolean> {
  const isKeyPressed = (event: KeyboardEvent): boolean => {
    return (event.key === key);
  };

  const keyDown$ = filter$$(fromEventTarget<'keydown', KeyboardEvent>(target, 'keydown'), isKeyPressed);
  const keyUp$ = filter$$(fromEventTarget<'keyup', KeyboardEvent>(window, 'keyup'), isKeyPressed);

  return merge([
    map$$(keyDown$, () => true),
    map$$(keyUp$, () => false),
  ]);
}
