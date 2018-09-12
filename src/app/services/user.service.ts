import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


import { User } from '../models/user'

import { JwtService } from './jwt.service'
import { NetworkService } from './network.service';

@Injectable()
export class UserService{
	private user:User;
	private userSubject:BehaviorSubject<User>;
	constructor(private networkService:NetworkService, private jwtService:JwtService){
		this.user = {
			loggedIn:false
		}
		this.userSubject=new BehaviorSubject(this.user);
	}
	authenticate(creditentals){
		return this.networkService.post('user/authenticate',creditentals)
		.pipe(
			tap((response:any) => {
				if(response.token){
					this.jwtService.setToken(response.token);
					this.logIn();
				}
			})
		)
	
	}

	getUser () {
		return this.userSubject;
	}

	logIn(){
		let payload = this.jwtService.decode();
		this.networkService.get(`user/${payload.id}/getUser`).subscribe((user:User) => {
			this.user = {
				id: user.id,
				name: user.name,
				email: user.email,
				accessFrom: new Date(user.accessFrom),
				accessTo: new Date(user.accessTo),
				loggedIn: true
			}
			this.userSubject.next(this.user);
		})
	}

	logOut(){
		this.user.loggedIn=false;
		this.jwtService.remove();
		this.userSubject.next(this.user);
	}
}