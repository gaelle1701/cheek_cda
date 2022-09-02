import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../shared/interface/product';
import { CartService } from '../../../cart/cart.service';

@Component({
  selector: 'app-page-list-product',
  templateUrl: './page-list-product.component.html',
  styleUrls: ['./page-list-product.component.css'],
})
export class PageListProductComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addProduct(productId?: number) {
    console.log(productId);
    this.cartService.addProduct({
      id: productId as number,
      quantity: 1,
      price: 90,
    });
  }
}
