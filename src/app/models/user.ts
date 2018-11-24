import { Role } from './role'
import { Group } from './group';

export interface User {
	id?:number;
	name?:string;
	email?:string;
	password?:string;
	role?:Role;
	accessFrom?:Date;
	accessTo?:Date;
	loggedIn?:boolean;
	checked?:boolean;
	notFound?:boolean;
	group?:Group;
}