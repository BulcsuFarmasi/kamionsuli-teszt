import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { components } from './user.declarations';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JwtService } from '../../services/jwt.service';
import { NetworkService } from '../../services/network.service';
import { UserService } from '../../services/user.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    JwtService,
    NetworkService,
    UserService
  ],
  declarations: [...components],
  exports: [...components]
})
export class UserModule { }
