import { ProductState } from './products/state/product.reducer';
import { UserState } from './user/state/user.reducer';

export class AppState {
  products: ProductState;
  users: UserState;
}
