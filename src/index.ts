import { debug } from './__debug/debug';
import { debugSuperCodec } from './__debug/super-codec/super-codec';
import { examples } from './__examples/examples';

function main(): void {
  // debug();
  // debugSuperCodec();
  examples();
}

window.onload = main;

