import { bootstrap } from '@lirx/dom';
import { AppHelloWorldComponent } from './hello-world.component';

function main(): void {
  bootstrap(new AppHelloWorldComponent());
}

window.onload = main;






