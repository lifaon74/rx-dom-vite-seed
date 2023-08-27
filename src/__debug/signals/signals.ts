import { Signal, computed, effect, signal } from '@lirx/core';

// https://en.wikipedia.org/wiki/Reactive_programming
// RFC https://github.com/angular/angular/discussions/49685

function debugSignals0(): void {
  const speedTest1 = () => {
    const count: number = 1e5;
    let z: number = 0;

    {
      console.time('test1');
      for (let i = 0; i < count; i++) {
        const a = new Signal(Math.random());
        z += a.get();
      }
      console.timeEnd('test1');
      console.log(z);
    }

    {
      console.time('test2');
      for (let i = 0; i < count; i++) {
        const a = new Signal(Math.random());
        z += a();
      }
      console.timeEnd('test2');
      console.log(z);
    }


    console.time('test3');
    for (let i = 0; i < count; i++) {
      const a = signal(Math.random());
      z += a();
    }
    console.timeEnd('test3');
    console.log(z);
  };

  for (let i = 0; i < 4; i++) {
    speedTest1();
  }
}

function debugSignals1(): void {
  const a = new Signal(1);
  const b = new Signal(2);

  Object.assign(window, {
    a,
    b,
  })

  const c = computed(() => a() + b());

  // const unsub = effect(() => {
  //   // console.log('effect', a() + b());
  //   console.log('effect', c());
  // });

  // const c$ = signalToObservable(c);
  // c$($log);

  // effect(() => {
  //   // console.log('effect', a() + b());
  //   console.log('effect', c());
  // });

  a.set(3);
  console.log(c());
  // unsub();
  b.set(3);
  console.log(c());
}

// function debugSignals2(): void {
//   const seconds = signal(1);
//   const t = computed(() => seconds() + 1);
//   const g = computed(() => t() > seconds());
//
//   const unsub = effect(() => {
//     console.log('effect', t(), g());
//   });
//
//   seconds.set(3);
// }
//
// function debugSignals3(): void {
//   const seconds = signal(0);
//   const t: ISignal<number> = computed<number>(() => seconds() > 0 ? (t() + 1) : 0);
//
//   const unsub = effect(() => {
//     console.log('effect', t());
//   });
//
//   seconds.set(1);
//   seconds.set(2);
// }
//
// function debugSignals4(): void {
//   const counter = signal(0);
//   const isEven = computed(() => counter() % 2 === 0);
//   const message = computed(() => `${counter()} is ${isEven() ? 'even' : 'odd'}`);
//
//   // message.toObservable({ emitCurrentValue: true })($log);
//
//   const unsub = effect(() => {
//     console.log('effect', message());
//   });
//
//   counter.set(1);
//   console.log('message', message());
//   counter.set(2);
//   console.log('message', message());
//   // counter.set(3);
// }
//
// function debugSignals5(): void {
//   const count = signal(0);
//
//   effect((onCleanup) => {
//     const countValue = count();
//
//     let secsFromChange = 0;
//     const id = setInterval(() => {
//       console.log(
//         `${countValue} had its value unchanged for ${++secsFromChange} seconds`,
//       );
//     }, 1000);
//
//     onCleanup(() => {
//       console.log('Clearing and re-scheduling effect');
//       clearInterval(id);
//     });
//   });
//
//   window.onclick = () => {
//     count.update(_ => _ + 1);
//   };
// }
//
// function debugSignals6(): void {
//   const counter = signal(0);
//   const isBig = signal(false);
//
//   effect(() => {
//     if (counter() > 5) {
//       isBig.set(true);
//     } else {
//       isBig.set(false);
//     }
//   }, { allowSignalWrites: true });
//
//   window.onclick = () => {
//     counter.update(_ => _ + 1);
//     console.log(counter(), isBig());
//   };
// }
//
// function debugSignals7(): void {
//   const count$ = scan$$(fromEventTarget(window, 'click'), (_) => _ + 1, 0);
//   const count = toSignal(count$, { initialValue: 0 });
//
//   effect(() => {
//     console.log('count', count());
//   });
//
//   // count.activate(false);
// }
//
// function debugSignals8(): void {
//   const a = signal(0);
//
//   // const b = computed(() => {
//   //   a.set(2);
//   //   return a();
//   // });
//   // console.log(a(), b());
//
//   // effect(() => {
//   //   const b = computed(a);
//   //   console.log('b', b());
//   // });
//
//   // effect(() => {
//   //   const b = computed(() => {
//   //     a.set(2);
//   //     return a();
//   //   });
//   //   console.log('b', b());
//   // }, { allowSignalWrites: true });
//
//
//   // effect(() => {
//   //   console.log('a', a());
//   //   a.update(_ => _ + 1);
//   // }, { allowSignalWrites: true });
//
//   // const b = computed((): any => {
//   //   return b();
//   // });
//   // console.log(b());
//
//   // const b = computed((): any => {
//   //   return c();
//   // });
//   // const c = computed((): any => {
//   //   return b();
//   // });
//   // console.log(b(), c());
//
//   const b = signal(1);
//   const c = computed(() => a() + b());
//   const unsubscribe = effect(() => {
//     console.log('c', c());
//     setTimeout(() => {
//       a.update(_ => _ + 1);
//       b.set(Math.random());
//     }, 0);
//   });
//   setTimeout(unsubscribe, 100);
// }

/*--------*/

export function debugSignals(): void {
  debugSignals0();
  // debugSignals1();
  // debugSignals2();
  // debugSignals3();
  // debugSignals4();
  // debugSignals5();
  // debugSignals6();
  // debugSignals7();
  // debugSignals8();
}


