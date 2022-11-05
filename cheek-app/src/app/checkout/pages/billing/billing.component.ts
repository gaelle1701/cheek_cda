import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../auth/services/auth.service';
import { IUser } from '../../../core/interfaces/user';
import { INITIAL_CART } from '../../../cart/components/cart/cart.component';
import { OrderService } from '../../../orders/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent implements OnInit {
  cart: any = INITIAL_CART;
  user!: IUser;

  faArrowLeft = faArrowLeft;
  faLock = faLock;

  // adresse de livraison
  shippingAddressForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormGroup({
      number: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      zip_code: new FormControl(null),
    }),
  });

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user) => { 
      this.user = user;
      this.shippingAddressForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user?.address ? user.address : null,
      });
    });
    
    this.cartService.getCart().subscribe(({ cart }) => {
      this.cart = cart;
    });
  }

  get f() {
    return this.shippingAddressForm.controls;
  }

  createOrder() {
    this.orderService
      .create({
        orderLines: this.cart.items.map((item: any) => {
          return {
            product: item.product.id,
            quantity: item.stock,
            size: item.size.label,
            price: item.priceHt,
          };
        }),
        user: this.user.id,
      })
      .subscribe((order) => {
        if (order.reference) {
          this.router.navigate(['/checkout/confirmation'], {
            queryParams: { id: order.id },
          });
        }
      });
  }

  onCreateShippingAddress() {    
    const formValues = this.shippingAddressForm.value;
    this.authService
      .editProfile(this.user.id, formValues)
      .subscribe((user) => {
        if(user.message === "Votre profile a bien été mis à jour!") {
            this.authService.getProfile().subscribe(user => {
              this.user = user;          
              if (user.address) {
                this.createOrder();
              }
            })
        }
      });
  }
}
