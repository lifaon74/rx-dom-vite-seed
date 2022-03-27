import { bootstrap } from '../../rx-dom/dist';
import { AppHelloWorldComponent } from './hello-world.component';

function main(): void {
  bootstrap(new AppHelloWorldComponent());
}

window.onload = main;






