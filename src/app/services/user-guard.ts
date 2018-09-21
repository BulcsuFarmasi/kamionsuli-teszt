import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { User } from '../models/user';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';


@Injectable()
export class UserGuard implements CanActivate {
	constructor(private userService:UserService, private router:Router,private jwtService:JwtService, private route:ActivatedRoute){}

	canActivate ():Observable<boolean>{
        return this.userService.getUserSubject().pipe(
            switchMap((user:User) => {
                if(!user.loggedIn){
                    console.log(this.route);
                   // let roleId = this.route.snapshot.data.roleId;
                    if(this.jwtService.isValid()){
                        this.userService.logIn();
                        return of(true);
                    }else{
                    //    let route = this.getRoute(roleId);
                        this.router.navigate(['admin/user/log-in/1']);
                        return of(false);
                    }
                }else{
                    return of(true);
                }
            })
        )
    }

    private getRoute (roleId) {
        let route;
        console.log(roleId)
        switch (roleId) {
            case 1:
             route = '/admin/user/log-in/1'; break;
            case 2:
             route = '/user/log-in/2'; break;
            
        }
        return route;
    }
}