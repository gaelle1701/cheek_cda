import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guard/admin.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { ProductFormComponent } from './pages/manage-products/product-form/product-form.component';
import { ManageSizesComponent } from './pages/manage-sizes/manage-sizes.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { SiteLayoutComponent } from '../layout/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: SiteLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'gestion-produits', component: ManageProductsComponent },
      { path: 'gestion-produits/ajouter', component: ProductFormComponent },
      { path: 'gestion-produits/editer/:id', component: ProductFormComponent },
      { path: 'gestion-tailles', component: ManageSizesComponent },
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
