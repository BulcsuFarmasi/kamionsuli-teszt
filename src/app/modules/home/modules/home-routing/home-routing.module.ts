import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { HomeComponent } from '../../components/home/home.component';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { testRoutes } from '../test/test.routing';
import { userRoutes } from '../../../user/user.routing';
import { UserGuard } from '../../../../services/user-guard';
import { UserService } from '../../../../services/user.service';

const homeRoutes:Routes = [
    { path: '',
      component: HomeComponent, 
      children: [
        {path:'', component: HomePageComponent, canActivate: [UserGuard], data: {roleId: 2}},  
        ...testRoutes,
        ...userRoutes,
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
