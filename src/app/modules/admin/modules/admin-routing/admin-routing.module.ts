import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { UserGuard } from '../../../../services/user-guard';

import { LoginComponent } from '../../login.component';
import { TestsComponent } from '../../tests.component';
import { TrashComponent } from '../../trash.component';
import { FillsComponent } from '../../fills.component';
import { FillComponent } from '../../fill.component';
import { EditComponent } from '../../edit.component';
import { AdminComponent } from '../../admin.component';

const adminRoutes: Routes = [
	{ path: 'admin', component: AdminComponent, children:[
		{ path:'login', component:LoginComponent},
		{ path:'tests', component:TestsComponent, canActivate:[UserGuard]},
		{ path:'trash', component:TrashComponent, canActivate:[UserGuard]},
		{ path:'fills/:testId', component:FillsComponent, canActivate:[UserGuard]},
		{ path:'fill/:fillId', component:FillComponent, canActivate:[UserGuard]},
		{ path:'edit/:testId', component:EditComponent, canActivate:[UserGuard]},
	]}
	
]

@NgModule({
	imports:[RouterModule.forChild(adminRoutes)],
	exports:[RouterModule]

})
export class AdminRoutingModule{}
