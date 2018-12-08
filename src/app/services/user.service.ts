import { Injectable } from '@angular/core';

import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';


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

	addUser (groupId:number) {
		return this.networkService.post(`user/${groupId}/addUser`,{});
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

	getUser (id:number) {
		return this.networkService.get(`user/${id}/getUser`).pipe(
			map((user:User) => {
				user.group.accessFrom = new Date(user.group.accessFrom);
				user.group.accessTo = new Date(user.group.accessTo);
				return user;
			})
		)
	} 

	getUserSubject () {
		return this.userSubject;
	}

	logIn(){
		let payload = this.jwtService.decode();
		this.networkService.get(`user/${payload.id}/getUser`).subscribe((user:User) => {
			this.user = {
				id: user.id,
				name: user.name,
				email: user.email,
				role: {
					id: user.role.id,
					name: user.role.name
				},
				loggedIn: true
			}

			if (user.group) {
				this.user.group = {
						id: user.group.id,
						name: user.group.name,
						accessFrom: user.group.accessFrom,
						accessTo: user.group.accessTo,
						type: {
							id: user.group.type.id,
							name: user.group.type.name
					}
				}
			}
			this.userSubject.next(this.user);
		})
	}

	logOut(){
		this.user.loggedIn=false;
		this.jwtService.remove();
		this.userSubject.next(this.user);
	}

	getUsers (groupId:number):Observable<User[]> {
		return <Observable<User[]>>this.networkService.get(`user/${groupId}/getUsers`)
	}

	deleteUser (id:number) {
		return this.networkService.delete('user/' + id)
			.pipe(
				map((response:any) => {
					if (response.errorCode) {
						throwError(response);
					}
				}
			)
		)
	}

	resetPassword(id:number, password:string) {
		return this.networkService.post(`user/${id}/resetPassword`, { password })
	}

	saveUser(user:User) {
		return this.networkService.patch('user/' + user.id, { user })
	}

	sendNotificationEmail (id:number) {
		return this.networkService.patch(`user/${id}/sendNotificationEmail`,{})
	}

	sendResetPassword (email:string) {
		return this.networkService.post('user/sendResetPassword', { email })
	}

	getByPasswordRetrieverCode (passwordRetrieverCode:string) {
		return this.networkService.get('user/getByPasswordRetrieverCode/' + passwordRetrieverCode);
	}
}