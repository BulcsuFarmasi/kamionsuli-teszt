import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AdminService } from './admin.service';
import { JwtService } from './jwt-service';


@Injectable()
export class AdminGuard implements CanActivate{
	constructor(private adminService:AdminService, private router:Router,private jwtService:JwtService){}

	canActivate(){
        console.log(this.adminService.loggedIn());
        if(!this.adminService.loggedIn()){
            if(!this.jwtService.isExpired()){
                this.adminService.logIn();
                return true;
            }else{
                this.router.navigate(['/login']);
                return false;
            }
        }else{
            return true;
        }
	}
}