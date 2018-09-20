import { Role } from './role'

export interface User {
	id?:number;
	name?:string;
	email?:string;
	password?:string;
	role?:Role;
	accessFrom?:Date;
	accessTo?:Date;
	loggedIn:boolean;
	checked?:boolean;
}