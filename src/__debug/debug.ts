import { debugReactiveDOMCompiler } from './aot/debug-reactive-dom-compiler';
import { debugLiRXDOM } from './debug-lirx-dom';
import { debugJBSONV2 } from './jbson-v2/debug-jbson-v2';

export function debug(): void {
  // debugLiRXDOM();
  // debugReactiveDOMCompiler();
  debugJBSONV2();
}
