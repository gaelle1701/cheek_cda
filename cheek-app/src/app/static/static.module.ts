import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module';

import { ProductsModule } from '../products/products.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, StaticRoutingModule, ProductsModule],
  exports: [HomeComponent],
})
export class StaticModule {}
