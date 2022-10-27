import { Component, Input, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../services/cart.service';
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
  @Input() togglePanel!: () => void;

  cart: any = INITIAL_CART;
  faTrash = faTrashAlt;

  tableHeaders = ['Nom', 'Prix HT', 'Taille', 'Qté'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();

    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
  }

  getCart() {
    this.cartService.getCart().subscribe(({ cart }) => {
      this.cart = cart;
      this.cartService.countChange(cart);
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
