import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../orders/services/order.service';
import { ITableHeader } from '../../../admin/components/table/table.component';
import {
  formatCurrency,
  formatDate,
  registerLocaleData,
} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AuthService } from '../../../auth/services/auth.service';
registerLocaleData(localeFr);

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  title = 'Commandes';

  headers?: ITableHeader[] = [
    { label: 'Date', key: 'date' },
    { label: 'Reference', key: 'reference' },
    { label: 'Statut', key: 'status' },
    { label: 'Prix', key: 'price' },
  ];
  orders: any = [];
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user) => {
      this.orderService.getAll({ userId: user.id }).subscribe((orders) => {
        this.orders = orders.map((order) => {
          const totalHt = order.orderLines.reduce(
            (acc, val) => acc + val.price * val.quantity,
            0,
          );
          const price = totalHt * (1 + 20 / 100);

          return {
            date: formatDate(order?.created_at as Date, 'dd MMMM yyyy', 'FR'),
            reference: order.reference,
            status: order.order_status?.toLowerCase(),
            price: formatCurrency(price, 'FR', '€'),
          };
        });
      });
    });
  }
}
