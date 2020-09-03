import { createReducer, on } from '@ngrx/store';

import * as GlobalAppState from '../../state/app.state';
import { Product } from '../product';
import {
  createProductFailure,
  createProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  loadProductsFailure,
  loadProductsSuccess,
  updateProductFailure,
  updateProductSuccess
} from './actions/product-api.actions';
import { clearCurrentProduct, initCurrentProduct, setCurrentProduct, toggleProductCode } from './actions/product-page.actions';

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

export const productReducer = createReducer<ProductState>(
  initialState,
  on(toggleProductCode, (state: ProductState): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(setCurrentProduct, (state: ProductState, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    };
  }),
  on(clearCurrentProduct, (state: ProductState): ProductState => {
    return {
      ...state,
      currentProductId: null
    };
  }),
  on(initCurrentProduct, (state: ProductState): ProductState => {
    return {
      ...state,
      currentProductId: 0
    };
  }),
  on(loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    };
  }),
  on(loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    };
  }),
  on(updateProductSuccess, (state, action): ProductState => {
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
  on(updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null,
      error: action.error
    };
  }),
  on(createProductSuccess, (state, action): ProductState => {
    const updatedProducts = [...state.products, {...action.product}];

    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(createProductFailure, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null,
      error: action.error
    };
  }),
  on(deleteProductSuccess, (state, action): ProductState => {
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
  on(deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null,
      error: action.error
    };
  }),
);
