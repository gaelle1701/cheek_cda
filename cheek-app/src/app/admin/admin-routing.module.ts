import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guard/admin.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'gestion-produits', component: ManageProductsComponent },
      { path: 'gestion-clients', component: ManageUsersComponent },
      { path: 'gestion-commandes', component: ManageOrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
