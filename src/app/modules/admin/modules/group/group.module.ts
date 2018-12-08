import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { components } from './group.declarations';
import { GroupService } from '../../../../services/group.service';
import { GroupTypeService } from 'src/app/services/group-type.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [components],
  providers: [GroupService, GroupTypeService],
  exports: [components]
})
export class GroupModule { }
