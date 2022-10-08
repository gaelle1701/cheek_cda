import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';
import { ProductFormComponent } from './pages/manage-products/product-form/product-form.component';
import { ProductsModule } from '../products/products.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageUsersComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ProductsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}