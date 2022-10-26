import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { ICart } from '../../../core/interfaces/cart';

export const INITIAL_CART: ICart = {
  items: [],
  totalHt: 0.0,
  totalTtc: 0.0,
  shippingFees: false,
};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = INITIAL_CART;

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

  removeProduct(productId: number, sizeId: number) {
    this.cartService.deleteProduct(productId, sizeId).subscribe(({ msg }) => {
      if (msg === 'ok') {
        this.getCart();
      }
    });
  }

  clearCart() {
    this.cartService.resetCart().subscribe(({ msg }) => {
      if (msg === 'ok') {
        this.getCart();
      }
    });
  }
}
