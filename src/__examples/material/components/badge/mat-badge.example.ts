import { bootstrap, VirtualTextNode } from '@lirx/dom';
import { MatBadgeComponent } from '@lirx/dom-material';

/** BOOTSTRAP FUNCTION **/

export function matBadgeExample() {
  const badge = bootstrap(MatBadgeComponent, new Map([
    ['*', (parentNode) => new VirtualTextNode('some text').attach(parentNode)],
  ]));

  // badge.inputs.set('content', 'abc abc abc abc abc abc abc abc abc abc abc abc abc abc');
  badge.inputs.set('content', '10');
  badge.setStyleProperty('font-size', '40px');
  badge.setStyleProperty('background-color', 'red');
  // badge.setClass('mat-dot', true);

  document.body.style.padding = '40px';
}
