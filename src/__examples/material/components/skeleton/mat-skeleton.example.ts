import { bootstrap } from '@lirx/dom';
import { MatSkeletonComponent } from '@lirx/dom-material';

/** BOOTSTRAP FUNCTION **/

export function matSkeletonExample() {
  const skeletonA = bootstrap(MatSkeletonComponent);
  const skeletonB = bootstrap(MatSkeletonComponent);
  const skeletonC = bootstrap(MatSkeletonComponent);

  // skeleton.setStyleProperty('width', '400px');
  // skeleton.setStyleProperty('height', '200px');

  skeletonB.setStyleProperty('margin-top', '8px');
  skeletonC.setStyleProperty('margin-top', '8px');
  skeletonC.setStyleProperty('height', '200px');

  skeletonB.setClass('mat-circular', true);
  skeletonC.setClass('mat-rectangular', true);
  skeletonB.setClass('mat-no-animation', true);
  skeletonC.setClass('mat-wave', true);

  document.body.style.padding = '40px';
}
