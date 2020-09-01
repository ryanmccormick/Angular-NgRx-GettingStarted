import { createAction, createReducer, on } from '@ngrx/store';

export interface ProductState {
  showProductCode: boolean;
}

export const DEFAULT_PRODUCT_STATE: ProductState = {
  showProductCode: true
};

export const productReducer = createReducer<ProductState, any>(
  DEFAULT_PRODUCT_STATE,
  on(createAction('[Product] Toggle Product Code'), state => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }));
