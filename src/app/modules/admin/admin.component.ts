import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import '../rxjs-op/rxjs-operators';

@Component({
	selector:'testr-admin',
	templateUrl:'templates/app.component.html',

})

export class AppComponent{
	constructor(public adminService:AdminService, private router:Router){}
	logout(){
		this.adminService.logout();
		this.router.navigate(['/login']);
	}
};