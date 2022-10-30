import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { PaymentComponent } from './pages/payment/payment.component';
import { BillingComponent } from './pages/billing/billing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthModule } from '../auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

@NgModule({
  declarations: [
    PaymentComponent,
    BillingComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class CheckoutModule {}
