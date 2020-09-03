import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');
export const setCurrentProduct = createAction('[Product] Set Current Product', props<{ currentProductId: number }>());
export const clearCurrentProduct = createAction('[Product] Clear Current Product');
export const initCurrentProduct = createAction('[Product] Init Current Product');
export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{products: Array<Product>}>());
export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{error: string}>());
export const updateProduct = createAction('[Product] Update Product', props<{product: Product}>());
export const updateProductSuccess = createAction('[Product] Update Product Success', props<{product: Product}>());
export const updateProductFailure = createAction('[Product] Update Product Fail', props<{error: string}>());
export const createProduct = createAction('[Product] Create New', props<{product: Product}>());
export const createProductSuccess = createAction('[Product] Create New Success', props<{product: Product}>());
export const createProductFailure = createAction('[Product] Create New Failure', props<{error: string}>());
export const deleteProduct = createAction('[Product] Delete Product', props<{product: Product}>());
export const deleteProductSuccess = createAction('[Product] Delete Product Success', props<{product: Product}>());
export const deleteProductFailure = createAction('[Product] Delete Product Failure', props<{error: string}>());
