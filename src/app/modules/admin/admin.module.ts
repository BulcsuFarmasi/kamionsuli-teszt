import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminComponent } from './components/admin/admin.component';

import { AdminRoutingModule } from './modules/admin-routing/admin-routing.module';
import { TestModule } from './modules/test/test.module';
import { FillModule } from './modules/fill/fill.module';

 
@NgModule({
	imports:[CommonModule, AdminRoutingModule, TestModule, FillModule],
	declarations:[AdminComponent],
	exports: [AdminComponent]

})
export class AdminModule{}