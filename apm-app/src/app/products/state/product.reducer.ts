import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as GlobalAppState from '../../state/app.state';
import * as ProductActions from './product.actions';
import { Product } from '../product';

export interface State extends GlobalAppState.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Array<Product>;
  error: string;
}

export const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

const defaultProduct: Product = {
  id: 0,
  productName: '',
  description: '',
  productCode: 'New',
  starRating: 0
};

/*
 * Selectors
 *********************************/
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {...defaultProduct};
    } else {
      return currentProductId ? state.products.find(product => product.id === currentProductId) : null;
    }
  }
);

// export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
export const getProducts = createSelector(getProductFeatureState, state => state.products);
export const getError = createSelector(getProductFeatureState, state => state.error);

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
      currentProductId: action.currentProductId
    };
  }),
  on(ProductActions.clearCurrentProduct, (state: ProductState): ProductState => {
    return {
      ...state,
      currentProductId: null
    };
  }),
  on(ProductActions.initCurrentProduct, (state: ProductState): ProductState => {
    return {
      ...state,
      currentProductId: 0
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProducts = [...state.products].map((product: Product) => {
      if (product.id === action.product.id) {
        return action.product;
      } else {
        return product;
      }
    });

    return {
      ...state,
      currentProductId: action.product.id,
      products: [...updatedProducts],
      error: ''
    };
  }),
  on(ProductActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null,
      error: action.error
    };
  }),
  on(ProductActions.createProductSuccess, (state, action): ProductState => {
    const updatedProducts = [...state.products, {...action.product}];

    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.createProductFailure, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null,
      error: action.error
    };
  }),
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    const updatedProducts = [...state.products].filter((product) => {
      return product.id !== action.product.id;
    });

    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null,
      error: action.error
    };
  }),
);
