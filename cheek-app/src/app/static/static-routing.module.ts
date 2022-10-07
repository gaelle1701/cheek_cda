import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticRoutingModule {}
