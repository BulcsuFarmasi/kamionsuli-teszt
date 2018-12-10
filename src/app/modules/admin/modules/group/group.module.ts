import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { components } from './group.declarations';
import { GroupTypeModule } from '../group-type/group-type.module';
import { GroupService } from '../../../../services/group.service';
import { GroupTypeService } from 'src/app/services/group-type.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    GroupTypeModule
  ],
  declarations: [components],
  providers: [GroupService, GroupTypeService, {
    provide: MAT_DATE_LOCALE, useValue: 'hu-HU'
  }],
  exports: [components]
})
export class GroupModule { }
