import { Routes } from '@angular/router';


import { LogInComponent } from './components/log-in/log-in.component';
import { ProfileComponent } from './components/profile/profile.component';

import { UserGuard } from '../../services/user-guard';

export const userRoutes:Routes = [
    {path: 'user/log-in/:roleId', component: LogInComponent  },
    {path: 'user/profile', component: ProfileComponent, canActivate: [UserGuard], data: {roleId: 2}  }
]