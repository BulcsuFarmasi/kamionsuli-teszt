import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AdminGuard } from '../services/admin-guard.service';

import { LoginComponent } from './login.component';
import { TestsComponent } from './tests.component';
import { TrashComponent } from './trash.component';
import { FillsComponent } from './fills.component';
import { FillComponent } from './fill.component';
import { EditComponent } from './edit.component';

const appRoutes: Routes = [
	{ path:'', redirectTo:'/login', pathMatch:'full' },
	{ path:'login', component:LoginComponent},
	{ path:'tests', component:TestsComponent, canActivate:[AdminGuard]},
	{ path:'trash', component:TrashComponent, canActivate:[AdminGuard]},
	{ path:'fills/:testId', component:FillsComponent, canActivate:[AdminGuard]},
	{ path:'fill/:fillId', component:FillComponent, canActivate:[AdminGuard]},
	{ path:'edit/:testId', component:EditComponent, canActivate:[AdminGuard]},
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{useHash:true});