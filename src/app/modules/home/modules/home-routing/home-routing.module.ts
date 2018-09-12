import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRoutes } from '../user/user.routing';

import { HomeComponent } from '../../components/home/home.component';
import { MainComponent } from '../../components/main/main.component';

const homeRoutes:Routes = [
    { path: '',
      component: HomeComponent, 
      children: [
        {path:'', component: MainComponent},
        ...UserRoutes
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
