import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { PageAddProductComponent } from './pages/page-add-product/page-add-product.component';
import { PageEditProductComponent } from './pages/page-edit-product/page-edit-product.component';
import { PageListProductComponent } from './pages/page-list-product/page-list-product.component';


@NgModule({
  declarations: [
    PageAddProductComponent,
    PageEditProductComponent,
    PageListProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [
    PageAddProductComponent,
    PageEditProductComponent,
    PageListProductComponent
  ]
})
export class ProductsModule { }
