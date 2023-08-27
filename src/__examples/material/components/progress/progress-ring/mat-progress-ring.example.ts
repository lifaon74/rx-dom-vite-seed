import { single } from '@lirx/core';
import { bootstrap } from '@lirx/dom';
import { MatProgressRingComponent } from '@lirx/dom-material';
import { createProgressAnimation } from '../create-progress-animation';


/** BOOTSTRAP FUNCTION **/

export function matProgressRingExample() {
  const progressRing = bootstrap(MatProgressRingComponent);

  progressRing.bindInputWithObservable('progress', single(0.75));
  progressRing.bindInputWithObservable('radius', single(100));
  progressRing.bindInputWithObservable('stroke', single(20));

  progressRing.setStyleProperty('--mat-progress-ring-color', { value: 'red' });

  createProgressAnimation(progressRing);
}
