import { Routes } from '@angular/router';


import { LogInComponent } from './components/log-in/log-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { SendResetPasswordComponent } from './components/send-reset-password/send-reset-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserGuard } from '../../services/user-guard';

export const userRoutes:Routes = [
    { path: 'user/log-in/:roleId', component: LogInComponent  },
    { path: 'user/profile', component: ProfileComponent, canActivate: [UserGuard], data: {roleId: 2}  },
    { path: 'users/:groupId', component: UsersComponent, canActivate: [UserGuard], data: {roleId: 1}  },
    { path: 'user/edit/:id', component: EditUserComponent, canActivate: [UserGuard], data: {roleId: 1}},
    { path: 'user/send-reset-password', component: SendResetPasswordComponent },
    { path: 'user/reset-password/:passwordRetreiverCode', component: ResetPasswordComponent }
]