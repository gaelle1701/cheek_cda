import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { CoreModule } from '../core/core.module';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ProductCardComponent,
    ListProductsComponent,
    ProductDetailComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProductsRoutingModule

  ],
  exports: [
    ProductCardComponent,
    ListProductsComponent,
    ProductDetailComponent,
  //   ManageProductsComponent
  ]
})
export class ProductsModule { }
