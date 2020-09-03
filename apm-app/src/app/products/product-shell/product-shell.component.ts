import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';
import { Product } from '../product';
import { initCurrentProduct, loadProducts, setCurrentProduct, toggleProductCode } from '../state/actions/product-page.actions';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Array<Product>>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(setCurrentProduct({currentProductId: product.id}));
  }
}
