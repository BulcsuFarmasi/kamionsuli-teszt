import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { components } from './declarations';


import { FillService } from '../../../../services/fill.service';
import { NetworkService } from '../../../../services/network.service';
import { JwtService } from '../../../../services/jwt.service';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, RouterModule
  ],
  providers:[FillService, NetworkService, JwtService],
  declarations: [components]
})
export class FillModule { }
