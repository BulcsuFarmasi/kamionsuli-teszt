import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { components } from './user.declarations';


import { EditableModule } from '../admin/modules/editable/editable.module';

import { JwtService } from '../../services/jwt.service';
import { NetworkService } from '../../services/network.service';
import { UserService } from '../../services/user.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    EditableModule
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
