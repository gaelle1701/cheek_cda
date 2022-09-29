import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CoreModule

  ],
  exports: [
    ProductCardComponent
  //   ProductsListComponent,
  //   ManageProductsComponent
  ]
})
export class ProductsModule { }
