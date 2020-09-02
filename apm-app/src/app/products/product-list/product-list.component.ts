import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as ProductActions from '../state/product.actions';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { getCurrentProduct, getShowProductCode, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private productService: ProductService, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.select(getCurrentProduct).subscribe(product => this.selectedProduct = product);

    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    // POTENTIAL UNSUBSCRIBE EXAMPLE
    // this.sub.add(this.store.select('products').subscribe((products: ProductState) => {
    //   this.displayCode = products.showProductCode;
    // }));

    // TODO: UNSUBSCRIBE
    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({product}));
  }

}
