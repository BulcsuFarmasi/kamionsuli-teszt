import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { CKEditorModule } from 'ng2-ckeditor';


import { components } from './declarations';
import { NetworkService } from '../../../../services/network.service';
import { JwtService } from '../../../../services/jwt.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpClientModule, RouterModule, CKEditorModule
  ],
  providers: [NetworkService, JwtService],
  declarations: [...components],
  exports: [...components]
})
export class TestModule { }
