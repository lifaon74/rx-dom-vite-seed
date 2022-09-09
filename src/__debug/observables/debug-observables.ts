import {
  $log,
  createNextNotification,
  fromReadableStream,
  fromReadableWritablePair, futureUnsubscribe,
  IObservable, IObserver, IUnsubscribe,
  map$$, merge,
  pipe$$,
  single,
  sourceObservablePipe,
  STATIC_COMPLETE_NOTIFICATION,
  switchMap$$,
  timeout,
} from '@lirx/core';

/*----------------*/

function debugCompressBlob() {
  const data = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mollis mauris odio, nec dapibus nunc placerat in. Cras ac nibh eu sem maximus lobortis. In porttitor justo ex, eu tristique erat molestie a. In laoreet sapien eu turpis auctor, et ultricies justo volutpat. Donec ac tincidunt lorem, quis gravida ipsum. Integer vehicula blandit orci, a maximus ligula bibendum ac. Aliquam at est urna. Phasellus sollicitudin efficitur dictum. Curabitur pretium eleifend elit at pulvinar. Cras ut pretium diam. Aenean sed lobortis dui, eu lacinia quam. Proin imperdiet convallis lorem, quis consequat nulla lacinia eget. Donec non nunc vel elit rhoncus fermentum. Suspendisse ac ullamcorper augue, ac faucibus erat. Donec malesuada justo quam, ut pellentesque justo aliquet finibus.`;
  const blob = new Blob([data], { type: 'text/plain' });

  /*---*/

  const example1 = async () => {
    const compressedStream = blob.stream().pipeThrough(new CompressionStream('gzip'));

    const reader: ReadableStreamDefaultReader<Uint8Array> = compressedStream.getReader();

    let result: ReadableStreamDefaultReadResult<Uint8Array>;
    while (!(result = await reader.read()).done) {
      console.log(result);
    }
  };

  const example2 = () => {
    const { emit: $gzip, subscribe: gzip$ } = fromReadableWritablePair(new CompressionStream('gzip'));

    const blobData$ = fromReadableStream(blob.stream());

    blobData$($gzip);

    gzip$($log);
  };

  const example3 = () => {
    const compressed$ = pipe$$(fromReadableStream(blob.stream()), [
      sourceObservablePipe({
        getSource: () => fromReadableWritablePair(new CompressionStream('gzip')),
      }),
    ]);

    compressed$($log);
  };

  const example4 = () => {
    const compressed$ = fromReadableStream(blob.stream().pipeThrough(new CompressionStream('gzip')));

    compressed$($log);
  };

  const example5 = () => {
    const { emit: $text, subscribe: text$ } = fromReadableWritablePair(new TextEncoderStream());

    const compressed$ = pipe$$(text$, [
      sourceObservablePipe({
        getSource: () => fromReadableWritablePair(new CompressionStream('gzip')),
      }),
    ]);

    compressed$($log);

    $text(createNextNotification(data));
    $text(STATIC_COMPLETE_NOTIFICATION);
  };

  // example3();
  // example4();
  example5();

  // const input = new TextEncoder().encode(data);
  // const cs = new CompressionStream('deflate');
  // const writer = cs.writable.getWriter();
  // writer.write(input);
  // writer.close();
  // const output = [];
  // const reader = cs.readable.getReader();
  // let totalSize = 0;
  // while (true) {
  //   const { value, done } = await reader.read();
  //   if (done)
  //     break;
  //   output.push(value);
  //   totalSize += value.byteLength;
  // }
  //
  // console.log(output);
}

// function debugLoopObservable() {
//
//   // const loop = (
//   //   obs: IObservable<number>,
//   // ): IObservable<number> => {
//   //   return switchMap$$(obs, (value: number): IObservable<number> => {
//   //     return switchMap$$(timeout(100), () => loop(single(value + 1)));
//   //   });
//   // };
//
//   // const loop = (
//   //   obs: IObservable<number>,
//   // ): IObservable<number> => {
//   //   return switchMap$$(obs, (value: number): IObservable<number> => {
//   //     return switchMap$$(timeout(100), () => loop(single(value + 1)));
//   //   });
//   // };
//
//
//   interface ICallback<GValue> {
//     (
//       value: GValue,
//     ): IObservable<GValue>;
//   }
//
//   function loopReduceObservable<GValue>(
//     mapFunction: ICallback<GValue>,
//     value$: IObservable<GValue>,
//   ): IObservable<GValue> {
//     return (emit: IObserver<GValue>): IUnsubscribe => {
//       let running: boolean = true;
//       // let childUnsubscribeFunction: IUnsubscribe;
//       //
//       // const unsubscribeChild = (): void => {
//       //   if (childUnsubscribeFunction !== void 0) {
//       //     childUnsubscribeFunction();
//       //   }
//       // };
//
//       const unsubscribe: IUnsubscribe = futureUnsubscribe((
//         unsubscribe: IUnsubscribe,
//       ): IUnsubscribe => {
//
//       });
//
//       // const unsubscribe = value$((value: GValue): void => {
//       //   unsubscribe();
//       //   emit(value);
//       //   childUnsubscribeFunction = mapFunction(value);
//       // });
//
//       return (): void => {
//         if (running) {
//           running = false;
//           unsubscribe();
//           unsubscribeChild();
//         }
//       };
//     };
//
//     // return switchMap$$<GValue, GValue>(initialValue, (value: GValue): IObservable<GValue> => {
//     //   return merge([
//     //     single<GValue>(value),
//     //     loopReduceObservable<GValue>(callback(value), callback),
//     //   ]);
//     // });
//   }
//
//   // const counter$ = loop(single(0));
//   const counter$ = loopReduceObservable((value: number): IObservable<number> => {
//     // return map$$(timeout(100), () => (value + 1))
//     return single(value + 1);
//   }, single(0));
//
//   counter$($log);
// }

/*----------------*/

export function debugObservables(): void {
  // debugCompressBlob();
  // debugLoopObservable();
}
