import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { components } from './user.declarations';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NetworkService } from '../../../../services/network.service';
import { UserService } from '../../../../services/user.service';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    NetworkService,
    UserService
  ],
  declarations: [...components, ProfileComponent],
  exports: [...components]
})
export class UserModule { }
