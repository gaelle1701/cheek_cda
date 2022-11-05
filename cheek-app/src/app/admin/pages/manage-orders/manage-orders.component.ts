import { formatCurrency, formatDate, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { OrderService } from 'src/app/orders/services/order.service';
import { ITableHeader } from '../../components/table/table.component';
import localeFr from '@angular/common/locales/fr';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
registerLocaleData(localeFr);

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  title = 'Commandes clients';
  faArrowLeft = faArrowLeft;

  headers?: ITableHeader[] = [
    { label: 'Client', key: 'user' },
    { label: 'Date', key: 'date' },
    { label: 'Reference', key: 'reference' },
    { label: 'Statut', key: 'status' },
    { label: 'Prix', key: 'price' },
  ];

  orders: any = [];

  constructor(  private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
  
    this.orderService.getAll().subscribe((orders) => {
      this.orders = orders.map((order) => {

        const totalHt = order.orderLines.reduce(
          (acc, val) => acc + val.price * val.quantity,
          0,
        );

        const price = totalHt * (1 + 20 / 100);
        return {
          // @ts-ignore
          user: order.user.lastName + " " + order.user.firstName,
          date: formatDate(order?.created_at as Date, 'dd MMMM yyyy', 'FR'),
          reference: order.reference,
          status: order.order_status?.toLowerCase(),
          price: formatCurrency(price, 'FR', '€'),
        };  
      })
    });

  }


  editOrder() {}

  deleteOrder() {}
}
