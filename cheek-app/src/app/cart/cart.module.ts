import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './components/cart/cart.component';
import { CartPanelComponent } from './components/cart-panel/cart-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CartComponent, CartPanelComponent],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }],
  imports: [CommonModule, FontAwesomeModule],
  exports: [CartPanelComponent, CartComponent],
})
export class CartModule {}
