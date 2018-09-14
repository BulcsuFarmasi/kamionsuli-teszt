import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';


@Component({
	selector:'testr-admin',
	templateUrl:'templates/app.component.html',

})

export class AdminComponent{
	constructor(public adminService:UserService, private router:Router){}
	logout(){
		this.adminService.logOut();
		this.router.navigate(['/login']);
	}
};