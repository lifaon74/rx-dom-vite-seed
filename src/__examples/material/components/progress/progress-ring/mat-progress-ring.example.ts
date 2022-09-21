import { bootstrap } from '@lirx/dom';
import { MatProgressRingComponent } from '@lirx/dom-material';
import { createProgressAnimation } from '../create-progress-animation';


/** BOOTSTRAP FUNCTION **/

export function matProgressRingExample() {
  const progressRing = bootstrap(MatProgressRingComponent);

  progressRing.inputs.set('progress', 0.75);
  progressRing.inputs.set('radius', 100);
  progressRing.inputs.set('stroke', 20);

  progressRing.setStyleProperty('--mat-progress-ring-color', { value: 'red' });

  createProgressAnimation(progressRing);
}
