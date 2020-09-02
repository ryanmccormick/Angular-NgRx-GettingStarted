import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as GlobalAppState from '../../state/app.state';
import { Product } from '../product';

export interface State extends GlobalAppState.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Array<Product>;
}

export const initialState: ProductState = {
  showProductCode: true,
  currentProductId: -1,
  products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) =>
    state.products.find(product => product.id === currentProductId)
);
export const getProducts = createSelector(getProductFeatureState, state => state.products);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }));
