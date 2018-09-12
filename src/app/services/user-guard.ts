import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { User } from '../models/user';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';


@Injectable()
export class UserGuard implements CanActivate {
	constructor(private userService:UserService, private router:Router,private jwtService:JwtService){}

	canActivate ():Observable<boolean>{
        return this.userService.getUser().pipe(
            switchMap((user:User) => {
                if(!user.loggedIn){
                    if(!this.jwtService.isExpired()){
                        this.userService.logIn();
                        return of(true);
                    }else{
                        this.router.navigate(['/user/log-in']);
                        return of(false);
                    }
                }else{
                    return of(true);
                }
            })
        )
    }
}