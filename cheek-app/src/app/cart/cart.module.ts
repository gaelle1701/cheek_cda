import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [CartComponent],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
