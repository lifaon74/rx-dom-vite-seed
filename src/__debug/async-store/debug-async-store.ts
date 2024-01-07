import { IDBAsyncStore, PasswordEncryptedAsyncStore } from '@lirx/async-store';
import { Abortable } from '@lirx/async-task';

export async function debugAsyncStore() {
  const abortable = Abortable.never;

  const store = await IDBAsyncStore.open({ abortable }).toPromise();

  const encryptedStore = new PasswordEncryptedAsyncStore({
    store,
    password: 'abc',
  });

  // const testStore = store;
  const testStore = encryptedStore;

  await testStore.set('a', 'c', abortable).toPromise();
  // await store.delete('a', abortable).toPromise();
  const value = await testStore.get('a', abortable).toPromise();
  console.log(value);

  console.log(await testStore.values(abortable).toPromise());
  console.log(await testStore.entries(abortable).toPromise());

}
