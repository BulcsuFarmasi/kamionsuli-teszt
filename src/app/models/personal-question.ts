import { PersonalType } from './personal-type'

export interface PersonalQuestion{
	id:number;
	name:string;
	type:PersonalType;
	answer?:string; 
}