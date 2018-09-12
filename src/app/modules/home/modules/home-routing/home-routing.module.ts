import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { userRoutes } from '../user/user.routing';

import { HomeComponent } from '../../components/home/home.component';
import { MainComponent } from '../../components/main/main.component';
import { testRoutes } from '../test/test.routing';

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
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
