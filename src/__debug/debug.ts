import { debugAnimations } from './animations/debug-animations';
import { debugReactiveDOMCompiler } from './aot/debug-reactive-dom-compiler';
import { debugAnimation } from './debug-animation';
import { debugLiRXDOM } from './debug-lirx-dom';
import { debugIndexedDB } from './indexed-db/debug-indexed-db';
import { debugJBSONV2 } from './jbson-v2/debug-jbson-v2';
import { debugObjectProxy } from './object-proxy/debug-object-proxy';
import { debugObservables } from './observables/debug-observables';
import { rxDomExternalComponentExample } from './rx-dom-external-component/rx-dom-external-component.example';

export function debug(): void {
  // debugLiRXDOM();
  // debugReactiveDOMCompiler();
  // debugJBSONV2();
  // debugAnimations();
  // debugIndexedDB();
  // debugObservables();
  // debugObjectProxy();
  // debugAnimation();
  rxDomExternalComponentExample();
}
