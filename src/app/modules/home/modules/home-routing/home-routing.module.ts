import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { HomeComponent } from '../../components/home/home.component';

import { testRoutes } from '../test/test.routing';
import { userRoutes } from '../../../user/user.routing';

import { UserGuard } from '../../../../services/user-guard';
import { UserService } from '../../../../services/user.service';

const homeRoutes:Routes = [
    { path: '',
      component: HomeComponent, 
      children: [
        ...testRoutes,
        ...userRoutes,
        {path:'', redirectTo:'/tests', pathMatch:'full'},
      ] },
    
]

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  providers: [
    UserGuard,
    UserService
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
