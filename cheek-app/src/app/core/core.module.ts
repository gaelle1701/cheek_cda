import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StaticModule } from '../static/static.module';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  // exports des modules voulus et utilisés au démarage de l'appli
  exports: [
    AuthRoutingModule,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    StaticModule,
  ],
})
export class CoreModule {}
