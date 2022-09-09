import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


 const routes: Routes = [
//   { path: "", component: ProductsListComponent },
//   { path: "manage-products", component: ManageProductsComponent }
 ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ProductsRoutingModule { }
