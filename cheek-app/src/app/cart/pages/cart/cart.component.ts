import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { ICart } from '../../../shared/interface/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: ICart;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe(({ cart }) => {
      this.cart = cart;
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
