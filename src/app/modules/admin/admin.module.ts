import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminComponent } from './components/admin/admin.component';

import { AdminRoutingModule } from './modules/admin-routing/admin-routing.module';
import { TestModule } from './modules/test/test.module';
import { FillModule } from './modules/fill/fill.module';
import { NoteModule } from './modules/note/note.module';
import { UserModule } from '../user/user.module';
import { GroupModule } from './modules/group/group.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

 
@NgModule({
	imports:[CommonModule, AdminRoutingModule, TestModule, FillModule, GroupModule, NoteModule, UserModule], 
	declarations:[AdminComponent, NavBarComponent],
	exports: [AdminComponent]

})
export class AdminModule{}