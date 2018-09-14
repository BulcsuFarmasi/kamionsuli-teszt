import { Routes } from '@angular/router';


import { FillsComponent } from './components/fills/fills.component'
import { FillComponent } from './components/fill/fill.component'

import { UserGuard } from '../../../../services/user-guard';

export const fillRoutes:Routes = [
    { path:'fills/:testId', component:FillsComponent, canActivate:[UserGuard]},
    { path:'fill/:fillId', component:FillComponent, canActivate:[UserGuard]},
]