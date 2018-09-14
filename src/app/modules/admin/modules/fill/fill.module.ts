import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FillService } from '../../../../services/fill.service';
import { components } from './declarations';

@NgModule({
  imports: [
    CommonModule, FillService
  ],
  declarations: [components]
})
export class FillModule { }
