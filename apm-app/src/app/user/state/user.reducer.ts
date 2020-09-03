import { createReducer, on } from '@ngrx/store';

import { User } from '../user';
import { UserActions } from './index';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

export const initialState: UserState = {
  maskUserName: false,
  currentUser: null
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.maskUserName, (state: UserState): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
