import { Injectable } from '@angular/core';
import { Http } from '@angular/http'


import { JwtService } from './jwt-service'

import { Admin } from '../models/admin'

@Injectable()
export class AdminService{
	public admin:Admin;
	constructor(private http:Http, private jwtService:JwtService){
		this.admin.loggedIn=false;
	}
	authenticate(){
		return this.http.post('../api/public/admin/authenticate',JSON.stringify(this.admin))
		.toPromise()
		.then(response  => {
			var body=response.json();
			if(body.notFound){
				return false;
			}
			if(body.token){
				this.jwtService.setToken(body.token);
				this.logIn();
				return true;
			}
		})
	}
	logIn(){
		this.admin.loggedIn=true;
		this.admin.name=this.jwtService.decode().name;
	}
	loggedIn(){
		return this.admin.loggedIn;
	}

	logout(){
		this.admin.loggedIn=false;
		this.jwtService.remove();
	}
}