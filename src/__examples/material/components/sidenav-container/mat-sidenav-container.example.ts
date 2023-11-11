import { bootstrap } from '@lirx/dom';
import { MatSidenavContainerComponent } from '@lirx/dom-material';

/** BOOTSTRAP FUNCTION **/

export function matSidenavContainerExample() {
  const sidenav = bootstrap(MatSidenavContainerComponent);
  sidenav.data.hasBackdrop.emit(false);
  sidenav.data.opened.emit(true);
}
