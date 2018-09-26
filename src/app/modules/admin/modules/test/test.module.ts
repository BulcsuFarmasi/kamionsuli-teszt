import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { CKEditorModule } from 'ng2-ckeditor';


import { components } from './declarations';

import { EditableModule } from '../editable/editable.module';

import { NetworkService } from '../../../../services/network.service';
import { JwtService } from '../../../../services/jwt.service';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpClientModule, RouterModule, CKEditorModule, EditableModule
  ],
  providers: [NetworkService, JwtService],
  declarations: [...components],
  exports: [...components]
})
export class TestModule { }
