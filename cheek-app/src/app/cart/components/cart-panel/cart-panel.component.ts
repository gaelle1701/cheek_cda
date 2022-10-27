import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { faCartShopping, faClose } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.css'],
  animations: [
    trigger('openCloseCart', [
      state(
        'in',
        style({
          transform: 'translate3d(0,0,0)',
        }),
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        }),
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class CartPanelComponent implements OnInit {
  menuState = 'out';
  countCart = 0;

  faClose = faClose;
  faCartShopping = faCartShopping;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.countCart = cart.items.length;
    });
  }

  togglePanel(): void {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
