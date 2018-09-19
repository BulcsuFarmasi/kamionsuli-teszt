import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AdminComponent } from '../../components/admin/admin.component';
import { userRoutes } from '../../../user/user.routing';
import { testRoutes } from '../test/test.routing';
import { fillRoutes } from '../fill/fill.routing';

const adminRoutes: Routes = [
	{ path: 'admin', component: AdminComponent, children:[
		...userRoutes,
		...testRoutes,
		...fillRoutes,
		{path:'', redirectTo:'/admin/tests', pathMatch:'full'}
	]}
	
]

@NgModule({
	imports:[RouterModule.forChild(adminRoutes)],
	exports:[RouterModule]

})
export class AdminRoutingModule{}
