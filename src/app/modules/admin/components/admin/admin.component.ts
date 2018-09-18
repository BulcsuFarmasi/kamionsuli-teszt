import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user.service';


@Component({
	selector:'testr-admin',
	templateUrl:'./admin.component.html',
	styleUrls:['./admin.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class AdminComponent{
	constructor(public userService:UserService, private router:Router){}
	logout(){
		this.userService.logOut();
		this.router.navigate(['/login']);
	}
};