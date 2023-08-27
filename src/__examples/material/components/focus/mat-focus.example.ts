import {
  createLogObserver,
  IObservable,
  $log,
  merge,
  fromEventTarget,
  debounceTime$$,
  mapDistinct$$,
  debounceMicrotask$$,
  single, interval,
  fromActiveElement,
} from '@lirx/core';
import { FocusController } from '@lirx/dom-material';

/*--------------*/

/*--------------*/

function matFocusExample1(): void {
  document.body.innerHTML = `
    <style>
      *:focus-visible {
        outline: 2px solid black;
      }
      *:not(:focus-visible):focus {
        outline: 2px solid red;
      }
      *:not(:focus-visible):not(:focus):active {
        outline: 2px solid green;
      }
    </style>
    <div>
      <button id="b1">abc</button>
      <div class="jail" tabindex="-1">
        <button>def</button>
<!--        <input style="display: none" id="i1" name="ghi">-->
        <input id="i1" name="ghi">
      </div>
      <button>poi</button>
      <div tabindex="0">tabindex 0</div>
      <div>last</div>
    </div>
  `;

  const controller = new FocusController({
    // container: document.body,
    container: document.querySelector('.jail')! as HTMLElement,
    change: ({ before, after }) => {
      // console.log(after, after !== null);
      // return after !== null;
    },
  }).start();

  // controller.focusedElement$(createLogObserver('focusedElement'));

  Object.assign(window, {
    controller,
    b1: document.getElementById('b1'),
    i1: document.getElementById('i1'),
  });

  // setInterval(() => {
  //   controller.focus(document.getElementById('i1'));
  //   // alert(document.activeElement.tagName);
  // }, 500)
  // createFocusJail(document.body.querySelector('.jail')!);

  // mapDistinct$$(interval(1000), () => {
  //   return document.getElementById('i1')!.matches(':focus');
  // })($log);
}

function matFocusExample2(): void {
  document.body.innerHTML = `
    <style>
      *:focus-visible {
        outline: 2px solid black;
      }
      *:not(:focus-visible):focus {
        outline: 2px solid red;
      }
      *:not(:focus-visible):not(:focus):active {
        outline: 2px solid green;
      }
    </style>
    <div>
      <button id="b1">abc</button>
      <div class="jail" tabindex="-1">
        <button>def</button>
<!--        <input style="display: none" id="i1" name="ghi">-->
        <input id="i1" name="ghi">
      </div>
      <button>poi</button>
      <div tabindex="0">tabindex 0</div>
      <div>last</div>
    </div>
  `;

  fromActiveElement()($log);

  Object.assign(window, {
    b1: document.getElementById('b1'),
    i1: document.getElementById('i1'),
  });
}

/*--------------*/

export function matFocusExample(): void {
  // matFocusExample1();
  matFocusExample2();
}
