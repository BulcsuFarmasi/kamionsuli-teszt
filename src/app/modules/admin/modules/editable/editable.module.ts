import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { editableComponents } from './editable.declarations';
import { GroupTypeModule } from '../group-type/group-type.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GroupTypeModule
  ],
  declarations: [...editableComponents],
  exports: [...editableComponents]
})
export class EditableModule { }
