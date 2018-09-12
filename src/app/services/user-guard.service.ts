import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from './user.service';
import { JwtService } from './jwt.service';


@Injectable()
export class UserGuard /*implements CanActivate*/{
	constructor(private userService:UserService, private router:Router,private jwtService:JwtService){}

	/*canActivate(){
        /*this.
        console.log(this.adminService.loggedIn());
        if(!this.adminService.loggedIn()){
            if(!this.jwtService.isExpired()){
                this.adminService.logIn();
                return true;
            }else{
                this.router.navigate(['/user/log-in']);
                return false;
            }
        }else{
            return true;
        }
    }*/
}