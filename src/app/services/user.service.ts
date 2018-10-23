import { Injectable } from '@angular/core';

import { BehaviorSubject, throwError } from 'rxjs';
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

	addUser () {
		return this.networkService.post('user',{});
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
				user.accessFrom = new Date(user.accessFrom);
				user.accessTo = new Date(user.accessTo);
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
				accessFrom: new Date(user.accessFrom),
				accessTo: new Date(user.accessTo),
				role: {
					id: user.role.id,
					name: user.role.name
				},
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

	getUsers () {
		return this.networkService.get('user/getUsers').pipe(
			map((users:User[]) => {
				users = users.map(user => {
					user.accessFrom = new Date(user.accessFrom);
					user.accessTo = new Date(user.accessTo)
					return user;
				})
				return users;
			})
		)
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

	saveAccessFrom (id:number, accessFrom:Date) {
		return this.networkService.patch(`user/${id}/saveAccessFrom`, {accessFrom})
	}

	saveAccessTo (id:number, accessTo:Date) {
		return this.networkService.patch(`user/${id}/saveAccessTo`, {accessTo})
	}

	saveEmail (id:number, email) {
		return this.networkService.patch(`user/${id}/saveEmail`, {email})
	}

	saveName (id:number, name:string) {
		return this.networkService.patch(`user/${id}/saveName`, {name})
	}

	sendNotificationEmail (id:number) {
		return this.networkService.patch(`user/${id}/sendNotificationEmail`,{})
	}

	sendResetPassword (email:string) {
		return this.networkService.post('user/sendResetPassword', { email })
	}

	getByPasswordRetrieverCode (passwordRetrieverCode:string) {
		return this.networkService.patch('user/getByPasswordRetrieverCode', { passwordRetrieverCode })
	}
}