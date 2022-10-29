import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../../invoices/services/invoice.service';
import { EPaymentMode } from '../../../core/enums/payment-methode';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.invoiceService
        .create({
          // @ts-ignore
          order: params.id,
          payment_mode: EPaymentMode.PAYPAL,
        })
        .subscribe((invoice) => {
          if (invoice) {
            this.cartService.resetCart().subscribe();
          }
        });
    });
  }
}
