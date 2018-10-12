import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './group.declarations';
import { GroupService } from '../../../../services/group.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [components],
  providers: [GroupService],
  exports: [components]
})
export class GroupModule { }
