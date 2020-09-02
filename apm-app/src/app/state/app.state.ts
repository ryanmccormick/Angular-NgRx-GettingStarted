import { UserState } from '../user/state/user.reducer';

/**
 * Main app state definition.
 * NOTE: Do not include state definitions that are part of modules that
 *       are lazy loaded.
 */
export interface AppState {
  users: UserState;
}
