import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');
export const setCurrentProduct = createAction('[Product] Set Current Product', props<{ currentProductId: number }>());
export const clearCurrentProduct = createAction('[Product] Clear Current Product');
export const initCurrentProduct = createAction('[Product] Init Current Product');
export const loadProducts = createAction('[Product] Load Products');
export const updateProduct = createAction('[Product] Update Product', props<{ product: Product }>());
export const createProduct = createAction('[Product] Create New', props<{ product: Product }>());
export const deleteProduct = createAction('[Product] Delete Product', props<{ product: Product }>());
