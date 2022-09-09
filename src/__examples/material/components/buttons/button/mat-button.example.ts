import { bootstrap, VirtualTextNode } from '@lirx/dom';
import { MatBasicButtonPrimaryComponent } from './built-in/basic/primary/mat-basic-button-primary.component';
import { MatBasicButtonSecondaryComponent } from './built-in/basic/secondary/mat-basic-button-secondary.component';
import { MatFlatButtonPrimaryComponent } from './built-in/flat/primary/mat-flat-button-primary.component';
import { MatFlatButtonSecondaryComponent } from './built-in/flat/secondary/mat-flat-button-secondary.component';
import { MatButtonComponent } from './mat-button.component';



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
