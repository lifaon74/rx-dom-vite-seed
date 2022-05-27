import { bootstrap } from '../../../../../component/bootstrap';
import { MatProgressBarComponent } from './mat-progress-bar.component';
import { createProgressAnimation } from './misc/create-progress-animation';

/** BOOTSTRAP FUNCTION **/

export function matProgressBarExample() {
  const progressBar = bootstrap(MatProgressBarComponent);

  // progressBar.classList.add('with-animation');
  progressBar.setStyleProperty('--mat-progress-bar-color', { value: '#755d9a' });

  createProgressAnimation(progressBar);
}
