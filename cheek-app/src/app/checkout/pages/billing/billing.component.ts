import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../../cart/cart.service';
import { AuthService } from '../../../auth/services/auth.service';
import { IUser } from '../../../core/interfaces/user';
import { INITIAL_CART } from '../../../cart/pages/cart/cart.component';

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
    private cartService: CartService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user) => {
      this.user = user;

      if (user.address) {
        this.shippingAddressForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
        });
      }
    });

    this.cartService.getCart().subscribe(({ cart }) => {
      this.cart = cart;
    });
  }

  get f() {
    return this.shippingAddressForm.controls;
  }

  onCreateShippingAddress() {
    const formValues = this.shippingAddressForm.value;
    console.log(formValues);
    this.authService
      .editProfile(this.user.id, formValues)
      .subscribe((profile) => {
        console.log(profile);
      });
  }
}
