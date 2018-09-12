import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../services/admin.service';


@Component({
	templateUrl:'templates/login.component.html',
})

export class LoginComponent{
	public badCreditentals:boolean;
	constructor(public adminService:AdminService, private router:Router){
		this.badCreditentals=false;
	};
	sendLogin(){
		this.adminService.authenticate().then(success => {
			if(success){
				this.router.navigate(['/tests'])
			}else{
				this.badCreditentals=true;
			}
		})
	}
}