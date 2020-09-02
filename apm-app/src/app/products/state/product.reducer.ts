import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as GlobalAppState from '../../state/app.state';
import * as ProductActions from './product.actions';
import { Product } from '../product';

export interface State extends GlobalAppState.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  currentProductId: number;
  products: Array<Product>;
}

export const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  currentProductId: -1,
  products: []
};

/*
 * Selectors
 *********************************/
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);
export const getCurrentProductById = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) =>
    state.products.find(product => product.id === currentProductId)
);
export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
export const getProducts = createSelector(getProductFeatureState, state => state.products);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state: ProductState): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state: ProductState, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    };
  }),
  on(ProductActions.clearCurrentProduct, (state: ProductState): ProductState => {
    return {
      ...state,
      currentProduct: null
    };
  }),
  on(ProductActions.initCurrentProduct, (state: ProductState): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        description: '',
        productCode: 'New',
        starRating: 0
      }
    };
  })
);
