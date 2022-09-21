import { bootstrap, VirtualTextNode } from '@lirx/dom';
import {
  MatBasicButtonPrimaryComponent,
  MatBasicButtonSecondaryComponent,
  MatButtonComponent, MatFlatButtonPrimaryComponent,
  MatFlatButtonSecondaryComponent,
} from '@lirx/dom-material';



/* BASIC */

function matBasicButtonPrimaryExample(): void {
  bootstrap(MatBasicButtonPrimaryComponent, new Map([
    ['*', (parentNode) => new VirtualTextNode('click me').attach(parentNode)],
  ]));
}


function matBasicButtonSecondaryExample(): void {
  bootstrap(MatBasicButtonSecondaryComponent, new Map([
    ['*', (parentNode) => new VirtualTextNode('click me').attach(parentNode)],
  ]));
}


function matBasicButtonExample(): void {
  matBasicButtonPrimaryExample();
  matBasicButtonSecondaryExample();
}

/* FLAT */

function matFlatButtonPrimaryExample(): void {
  bootstrap(MatFlatButtonPrimaryComponent, new Map([
    ['*', (parentNode) => new VirtualTextNode('click me').attach(parentNode)],
  ]));
}


function matFlatButtonSecondaryExample(): void {
  bootstrap(MatFlatButtonSecondaryComponent, new Map([
    ['*', (parentNode) => new VirtualTextNode('click me').attach(parentNode)],
  ]));
}


function matFlatButtonExample(): void {
  matFlatButtonPrimaryExample();
  matFlatButtonSecondaryExample();
}

/* DEFAULT */


function matDefaultButtonExample(): void {
  bootstrap(MatButtonComponent, new Map([
    ['*', (parentNode) => new VirtualTextNode('click me').attach(parentNode)],
  ]));
}

/*---------------*/

export function matButtonExample(): void {
  matDefaultButtonExample();
  matBasicButtonExample();
  matFlatButtonExample();
}
