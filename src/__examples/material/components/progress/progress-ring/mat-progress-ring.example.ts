import { bootstrap } from '@lirx/dom';
import { createProgressAnimation } from '../progress-bar/misc/create-progress-animation';
import { MatProgressRingComponent } from './mat-progress-ring.component';

/** BOOTSTRAP FUNCTION **/

export function matProgressRingExample() {
  const progressRing = bootstrap(MatProgressRingComponent);

  progressRing.inputs.set('progress', 0.75);
  progressRing.inputs.set('radius', 100);
  progressRing.inputs.set('stroke', 20);

  progressRing.setStyleProperty('--mat-progress-ring-color', { value: 'red' });

  createProgressAnimation(progressRing);
}
