import { Routes } from '@angular/router';


import { FillsComponent } from './components/fills/fills.component'
import { FillComponent } from './components/fill/fill.component'

import { UserGuard } from '../../../../services/user-guard';

export const fillRoutes:Routes = [
    { path:'fills/:testId', component:FillsComponent, canActivate:[UserGuard], data: {roleId: 1}},
    { path:'fills', component:FillsComponent, canActivate:[UserGuard], data: {roleId: 1}},
    { path:'fill/:fillId', component:FillComponent, canActivate:[UserGuard], data: {roleId:1}},
]