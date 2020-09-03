import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
import { Product } from '../product';

const defaultProduct: Product = {
  id: 0,
  productName: '',
  description: '',
  productCode: 'New',
  starRating: 0
};

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
export const getProducts = createSelector(getProductFeatureState, state => state.products);
export const getError = createSelector(getProductFeatureState, state => state.error);
