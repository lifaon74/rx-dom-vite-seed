import { Abortable, AsyncTask, AWAIT, IAsyncTaskGenerator, YIELD, createAsyncTaskIterator } from '@lirx/async-task';

/*-------------*/

async function debugAsyncTask1() {
  function* gen(): IAsyncTaskGenerator<number, string, any> {
    if (yield AWAIT((abortable: Abortable) => AsyncTask.success(true, abortable))) {
      yield YIELD((abortable: Abortable) => AsyncTask.success(8, abortable));
    } else {
      for (let i = 0; i < 2; i++) {
        // try {
        //   yield YIELD((abortable: Abortable) => AsyncTask.error(i, abortable));
        // } catch {
        //   console.log('error');
        // }
        try {
          const value = yield YIELD((abortable: Abortable) => AsyncTask.success(i, abortable));
          console.log('value', value);
        } catch {
          console.log('error');
        } finally {
          console.log('finally');
        }
      }
    }

    return '123';
  }

  // function* gen2(): Generator<number, string> {
  //   for (let i = 0; i < 2; i++) {
  //     console.log('ok');
  //     // yield YIELD((abortable: Abortable) => AsyncTask.success(i, abortable));
  //
  //     try {
  //       throw 7;
  //       // yield 8;
  //     } catch {
  //       console.log('error');
  //     }
  //   }
  //
  //   return '123';
  // }

  const abortable = Abortable.never;

  const it = createAsyncTaskIterator(gen());
  console.log(await it.next(abortable).toPromise());
  // console.log(await it.throw(1, abortable).toPromise());
  console.log(await it.return('hui', abortable).toPromise());
  // console.log(it.next(Abortable.abort('ok')).toPromise());
  console.log(await it.next(1, abortable).toPromise());
  console.log(await it.next(abortable).toPromise());
}

/*-------------*/

export function debugAsyncTask(): void {
  debugAsyncTask1();
}
