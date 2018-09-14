import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './declarations';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class TestModule { }
