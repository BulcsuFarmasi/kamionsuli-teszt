import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { UserGuard } from '../../../../services/user-guard';

import { TestsComponent } from '../test/components/tests/tests.component';
import { TrashComponent } from '../test/components/trash/trash.component';
import { FillsComponent } from '../../fills.component';
import { FillComponent } from '../../fill.component';
import { EditComponent } from '../test/components/edit/edit.component';
import { AdminComponent } from '../../admin.component';
import { userRoutes } from '../../../user/user.routing';

const adminRoutes: Routes = [
	{ path: 'admin', component: AdminComponent, children:[
		...userRoutes,
		{ path:'fills/:testId', component:FillsComponent, canActivate:[UserGuard]},
		{ path:'fill/:fillId', component:FillComponent, canActivate:[UserGuard]},
	]}
	
]

@NgModule({
	imports:[RouterModule.forChild(adminRoutes)],
	exports:[RouterModule]

})
export class AdminRoutingModule{}
