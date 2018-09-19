import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TestModule } from './modules/test/test.module';
import { HomeRoutingModule } from './modules/home-routing/home-routing.module';

import { HomeComponent } from './components/home/home.component';
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    CommonModule,
    TestModule,
    UserModule,
    HomeRoutingModule,
    RouterModule
  ],
  declarations: [
      HomeComponent
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
