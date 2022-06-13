import { bootstrap, VirtualTextNode } from '@lirx/dom';
import { MatButtonComponent } from './mat-button.component';

export function matButtonExample(): void {
  const button = bootstrap(MatButtonComponent, new Map([
    ['*', (parentNode) => new VirtualTextNode('click me').attach(parentNode)],
  ]));

  // button.inputs.set('disabled', true);
}
