import { Answer } from './answer';
import { Question } from './question';
import { User } from './user';


export interface Fill{
	id?:number;
	score?:number;
	answers?:Answer[];
	questions?:Question[];
	user?:User;
	date?:string;
	time?:string;
}