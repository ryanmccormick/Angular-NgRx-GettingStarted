import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../product.service';
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
import { createProduct, deleteProduct, loadProducts, updateProduct } from './actions/product-page.actions';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() => this.productService.getProducts().pipe(
        map(products => loadProductsSuccess({products})),
        catchError(error => of(loadProductsFailure({error})))
      ))
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProduct),
      concatMap((action) => {
          const {updateProduct} = this.productService;

          return updateProduct(action.product).pipe(
            map(updatedProduct => updateProductSuccess({product: updatedProduct})),
            catchError(error => of(updateProductFailure({error})))
          );
        }
      ));
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createProduct),
      concatMap((action) => {
          const {createProduct} = this.productService;
          return createProduct(action.product).pipe(
            map(updatedProduct => createProductSuccess({product: updatedProduct})),
            catchError(error => of(createProductFailure({error})))
          );
        }
      ));
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProduct),
      concatMap((action) => {
          const {deleteProduct} = this.productService;
          return deleteProduct(action.product.id).pipe(
            map(updatedProduct => deleteProductSuccess({product: action.product})),
            catchError(error => of(deleteProductFailure({error})))
          );
        }
      ));
  });

}
