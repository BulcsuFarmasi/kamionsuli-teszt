import { Routes } from "@angular/router";

import { TestsComponent } from './components/tests/tests.component';
import { TrashComponent } from './components/trash/trash.component';
import { EditComponent } from './components/edit/edit.component';

import { UserGuard } from '../../../../services/user-guard';

export const testRoutes:Routes = [
    { path:'tests', component:TestsComponent, canActivate:[UserGuard]},
    { path:'trash', component:TrashComponent, canActivate:[UserGuard]},
    { path:'edit/:testId', component:EditComponent, canActivate:[UserGuard]}
]