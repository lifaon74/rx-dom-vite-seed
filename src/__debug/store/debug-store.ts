import { Store, AsyncAction } from '@lirx/store';

/*-------------*/

async function debugStore1() {
  interface IUser {
    readonly name: string;
  }

  interface IState {
    readonly users: readonly IUser[];
  }

  const store = Store.create<IState>({
    users: [],
  });

  const appendUser = store.createAction((state: IState, user: IUser): IState => {
    return {
      ...state,
      users: [
        ...state.users,
        user,
      ],
    };
  });

  const removeUserByName = store.createAction((state: IState, name: string): IState => {
    const index: number = state.users.findIndex((user: IUser) => (user.name === name));
    if (index === -1) {
      throw new Error(`User with name '${name}' is not present in the list`);
    } else {
      return {
        ...state,
        users: [
          ...state.users.slice(0, index),
          ...state.users.slice(index + 1),
        ],
      };
    }
  });

  const getUsers = new AsyncAction(store, (state: IState): Promise<IState> => {
    return Promise.resolve<IUser[]>([
      {
        name: 'Chloe',
      },
      {
        name: 'David',
      },
    ]) // simulate a fetch
      .then((users: IUser[]): IState => {
        return {
          ...state,
          users,
        };
      });
  });

  const usersSelector = store.createSelector((state: IState) => state.users);

  const users$ = usersSelector.get$();

  users$((users) => {
    console.log('users', users);
  });

  const mappedUsers$ = usersSelector.mapArrayItems$((user: IUser) => {
    console.log('call for', user);
    return {
      name: `prefix-${user.name}`,
    };
  });

  mappedUsers$((users) => {
    console.log('mappedUsers$', users);
  });


  appendUser.invoke({
    name: 'Alice',
  });

  appendUser.invoke({
    name: 'Bob',
  });

  removeUserByName.invoke('Alice');

  await getUsers.invoke(void 0);

}

/*-------------*/

export function debugStore(): void {
  debugStore1();
}
