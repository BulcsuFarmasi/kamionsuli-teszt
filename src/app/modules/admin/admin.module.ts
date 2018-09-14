import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './modules/admin-routing/admin-routing.module';
import { TestModule } from './modules/test/test.module';

 
@NgModule({
	imports:[CommonModule, AdminRoutingModule, TestModule],
	declarations:[AdminComponent],
	exports: [AdminModule]

})
export class AppModule{}