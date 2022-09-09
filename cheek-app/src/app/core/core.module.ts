import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductsRoutingModule } from '../products/products-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FontAwesomeModule
  ],
  // exports des modules voulus et utilisés au démarage de l'appli
  exports: [AuthRoutingModule, ProductsRoutingModule, HeaderComponent, NavComponent, FooterComponent]
})
export class CoreModule { }
