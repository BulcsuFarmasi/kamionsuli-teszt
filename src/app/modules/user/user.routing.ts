import { LogInComponent } from './components/log-in/log-in.component';
import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

export const userRoutes:Routes = [
    {path: 'log-in', component: LogInComponent  },
    {path: 'profile', component: ProfileComponent  }
]