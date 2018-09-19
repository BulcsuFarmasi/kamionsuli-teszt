import { Routes } from "@angular/router";

import { TestsComponent } from './components/tests/tests.component';
import { TrashComponent } from './components/trash/trash.component';
import { EditComponent } from './components/edit/edit.component';

import { UserGuard } from '../../../../services/user-guard';

export const testRoutes:Routes = [
    { path:'tests', component:TestsComponent, canActivate:[UserGuard], data: {roleId: 1}},
    { path:'trash', component:TrashComponent, canActivate:[UserGuard], data: {roleId: 1}},
    { path:'edit/:testId', component:EditComponent, canActivate:[UserGuard], data: {roleId: 1}}
]