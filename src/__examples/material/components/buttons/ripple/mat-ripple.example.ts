import { bootstrap } from '@lirx/dom';
import { MatRippleComponent } from './mat-ripple.component';

export function matRippleExample(): void {
  const rippleNode = bootstrap(MatRippleComponent);
  rippleNode.elementNode.style.marginTop = '100px';
  rippleNode.elementNode.style.marginLeft = '100px';
  rippleNode.elementNode.style.width = '300px';
  rippleNode.elementNode.style.height = '300px';
  rippleNode.elementNode.style.border = '1px solid black';
}
