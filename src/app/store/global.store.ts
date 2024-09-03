import { inject, InjectionToken } from "@angular/core";
import { IUser } from "@app/models";
import { UserService } from "@app/services";
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals'
import { lastValueFrom } from "rxjs";

type StoreState = {
  users: IUser[];
}

const initialState: StoreState = {
  users: [],
};

const STORE_STATE = new InjectionToken<StoreState>('GlobalStore', {
  factory: () => initialState,
});

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withMethods((store, userService = inject(UserService)) =>({
    getUser(id: number) {
      return store.users().find((usr) => usr.id === id);
    },

    async addUser(user: Omit<IUser, 'id'>) {
      try {
        await lastValueFrom(userService.addUser(user));
        patchState(store, ({ users }) => ({
          users: [
            ...users,
            { id: new Date().getTime(), ...user }
          ],
        }));
      } catch (error) {}
    },

    async removeUser(id: number) {
      try {
        await lastValueFrom(userService.removeUser(id));

        patchState(store, ({ users }) => ({
          users: users.filter((usr) => usr.id !== id),
        }));
      } catch (error) {}
    },

    async updateUser(user: IUser) {
      try {
        await lastValueFrom(userService.updateUser(user));

        patchState(store, ({ users }) => ({
          users: users.map((usr) =>
            usr.id === user.id ? { ...usr, ...user } : usr,
          ),
          isLoading: false,
        }));
      } catch (error) {}
    },


  })),
  withHooks({
    async onInit(store, userService = inject(UserService)) {
      const users = await lastValueFrom(
        userService.getAllUsers(),
      );

      patchState(store, { users });
    },
  }),
)
