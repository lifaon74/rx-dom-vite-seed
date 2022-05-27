import { bootstrap } from '../../../../../component/bootstrap';
import { VirtualTextNode } from '../../../../../virtual-node/dom/nodes/static/text/virtual-text-node';
import { MatButtonComponent } from './mat-button.component';

export function matButtonExample(): void {
  const button = bootstrap(MatButtonComponent, new Map([
    ['*', (parentNode) => new VirtualTextNode('click me').attach(parentNode)],
  ]));

  button.inputs.set('disabled', true);
}
