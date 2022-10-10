import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { ICart } from '../../../shared/interface/cart';
import { ProductsService } from '../../../products/services/products.service';

export const INITIAL_CART: ICart = {
  items: [],
  total_ht: 0.0,
  total_ttc: 0.0,
  shippingFees: false,
};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: ICart = INITIAL_CART;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe(({ cart }) => {
      this.cart = cart;
      this.cartService.countChange(cart.items.length);
    });
  }

  removeProduct(id: number) {
    this.cartService.deleteProduct(id).subscribe(({ cart }) => {
      this.cart = cart;
      this.cartService.countChange(cart.items.length);
    });
  }

  clearCart() {
    this.cartService.resetCart().subscribe((c) => {
      // @ts-ignore
      if (c.msg === 'ok') {
        this.getCart();
      }
    });
  }
}
