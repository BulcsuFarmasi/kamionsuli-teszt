import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupTypeSelectComponent } from './components/group-type-select/group-type-select.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [GroupTypeSelectComponent],
  exports:[GroupTypeSelectComponent]
})
export class GroupTypeModule { }
