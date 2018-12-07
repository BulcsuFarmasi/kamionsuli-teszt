import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AdminComponent } from '../../components/admin/admin.component';
import { fillRoutes } from '../fill/fill.routing';
import { groupRoutes } from '../group/group.routing';
import { noteRoutes } from '../note/note.routing';
import { testRoutes } from '../test/test.routing';
import { userRoutes } from '../../../user/user.routing';

const adminRoutes: Routes = [
	{ path: 'admin', component: AdminComponent, children: [
		...fillRoutes,
		...groupRoutes,
		...noteRoutes,
		...testRoutes,
		...userRoutes,
		{path:'', redirectTo:'/admin/tests', pathMatch:'full'}
	]}
	
]

@NgModule({
	imports:[RouterModule.forChild(adminRoutes)],
	exports:[RouterModule]

})
export class AdminRoutingModule{}
