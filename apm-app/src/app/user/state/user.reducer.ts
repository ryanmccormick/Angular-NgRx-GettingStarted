import { createAction, createReducer, on } from '@ngrx/store';

export interface UserState {
  maskUserName: boolean;
}

export const DEFAULT_USER_STATE: UserState = {
  maskUserName: false
};

export const userReducer = createReducer<UserState, any>(
  DEFAULT_USER_STATE,
  on(createAction('[User] Toggle Mask User Name', (state: UserState) => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  }))
);
