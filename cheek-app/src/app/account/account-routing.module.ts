import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SiteLayoutComponent } from '../layout/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: SiteLayoutComponent,
    children: [
      { path: '', component: AccountComponent },
      { path: 'profil', component: ProfileComponent },
      { path: 'commande', component: OrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
