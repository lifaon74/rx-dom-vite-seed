import { bootstrap } from '@lirx/dom';
import { MatProgressBarComponent } from './mat-progress-bar.component';
import { createProgressAnimation } from './misc/create-progress-animation';

/** BOOTSTRAP FUNCTION **/

export function matProgressBarExample() {
  const progressBar = bootstrap(MatProgressBarComponent);

  // progressBar.classList.add('mat-with-animation');
  progressBar.setStyleProperty('--mat-progress-bar-color', { value: '#755d9a' });

  createProgressAnimation(progressBar);
}
