import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ProductActions from './product.actions';
import { ProductService } from '../product.service';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() => this.productService.getProducts().pipe(
        map(products => ProductActions.loadProductsSuccess({products})),
        catchError(error => of(ProductActions.loadProductsFailure({error})))
      ))
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap((action) => {
          const {updateProduct} = this.productService;

          return updateProduct(action.product).pipe(
            map(updatedProduct => ProductActions.updateProductSuccess({product: updatedProduct})),
            catchError(error => of(ProductActions.updateProductFailure({error})))
          );
        }
      ));
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      concatMap((action) => {
          const {createProduct} = this.productService;
          return createProduct(action.product).pipe(
            map(updatedProduct => ProductActions.createProductSuccess({product: updatedProduct})),
            catchError(error => of(ProductActions.createProductFailure({error})))
          );
        }
      ));
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      concatMap((action) => {
          const {deleteProduct} = this.productService;
          return deleteProduct(action.product.id).pipe(
            map(updatedProduct => ProductActions.deleteProductSuccess({product: action.product})),
            catchError(error => of(ProductActions.deleteProductFailure({error})))
          );
        }
      ));
  });

}
