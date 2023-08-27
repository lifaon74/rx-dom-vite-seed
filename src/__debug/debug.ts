import { debugAnimations } from './animations/debug-animations';
import { debugReactiveDOMCompiler } from './aot/debug-reactive-dom-compiler';
import { debugAsyncTask } from './async-task/debug-async-task';
import { debugAnimation } from './debug-animation';
import { debugLiRXDOM } from './debug-lirx-dom';
import { debugIndexedDB } from './indexed-db/debug-indexed-db';
import { debugJBSONV2 } from './jbson-v2/debug-jbson-v2';
import { debugI18n } from './i18n/debug-i18n';
import { debugLiRXCache } from './lirx-cache/debug-lirx-cache';
import { debugObjectProxy } from './object-proxy/debug-object-proxy';
import { debugObservableProxy } from './object-proxy/debug-observable-proxy';
import { debugObservables } from './observables/debug-observables';
import { debugSignals } from './signals/signals';
import { debugStore } from './store/debug-store';
import { debugScope } from './scope/debug-scope';

export function debug(): void {
  // debugLiRXDOM();
  // debugReactiveDOMCompiler();
  // debugJBSONV2();
  // debugAnimations();
  // debugIndexedDB();
  // debugObservables();
  // debugObjectProxy();
  // debugObservableProxy();
  // debugAnimation();
  debugI18n();
  // debugLiRXCache();
  // debugStore();
  // debugSignals();
  // debugAsyncTask();
  // debugScope();
}
