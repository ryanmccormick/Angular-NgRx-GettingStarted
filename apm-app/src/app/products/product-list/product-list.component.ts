import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() products: Array<Product>;
  @Input() selectedProduct: Product;
  @Input() displayCode: boolean;
  @Input() errorMessage: string;
  @Output() checkChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() newProduct: EventEmitter<void> = new EventEmitter<void>();
  @Output() productSelected: EventEmitter<Product> = new EventEmitter<Product>();

  handleCheckChanged(): void {
    this.checkChanged.emit();
  }

  handleNewProduct(): void {
    this.newProduct.emit();
  }

  handleProductSelected(product: Product): void {
    this.productSelected.emit(product);
  }

}
