import { debugAnimations } from './animations/debug-animations';
import { debugReactiveDOMCompiler } from './aot/debug-reactive-dom-compiler';
import { debugLiRXDOM } from './debug-lirx-dom';
import { debugIndexedDB } from './indexed-db/debug-indexed-db';
import { debugJBSONV2 } from './jbson-v2/debug-jbson-v2';

export function debug(): void {
  // debugLiRXDOM();
  // debugReactiveDOMCompiler();
  // debugJBSONV2();
  // debugAnimations();
  debugIndexedDB();
}
