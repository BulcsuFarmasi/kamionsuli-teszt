import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user.service';


@Component({
	selector:'testr-admin',
	templateUrl:'./app.component.html',
	styleUrls:['./admin.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class AdminComponent{
	constructor(public adminService:UserService, private router:Router){}
	logout(){
		this.adminService.logOut();
		this.router.navigate(['/login']);
	}
};