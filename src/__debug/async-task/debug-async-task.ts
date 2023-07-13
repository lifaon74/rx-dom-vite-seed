import { Abortable, AsyncTask } from '@lirx/async-task';
import { Store, AsyncAction } from '@lirx/store';
import { AWAIT, createAsyncTaskIterator, IAsyncTaskGenerator, YIELD } from './async-task-iterator';

/*-------------*/

async function debugAsyncTask1() {
  function* gen(): IAsyncTaskGenerator<number> {
    if (yield AWAIT((abortable: Abortable) => AsyncTask.success(false, abortable))) {
      yield YIELD((abortable: Abortable) => AsyncTask.success(8, abortable));
    } else {
      for (let i = 0; i < 10; i++) {
        // yield YIELD((abortable: Abortable) => AsyncTask.success(i, abortable));

        try {
          yield YIELD((abortable: Abortable) => AsyncTask.error(i, abortable));
        } catch {
          console.log('error');
        }
      }
    }
  }

  const abortable = Abortable.never;

  const it = createAsyncTaskIterator(gen());
  console.log(await it.next(abortable).toPromise());
  // console.log(it.next(Abortable.abort('ok')).toPromise());
  console.log(await it.next(abortable).toPromise());
  console.log(await it.next(abortable).toPromise());
}

/*-------------*/

export function debugAsyncTask(): void {
  debugAsyncTask1();
}
