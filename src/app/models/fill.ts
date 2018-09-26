import { Answer } from './answer';
import { Question } from './question';


export interface Fill{
	id?:number;
	score?:number;
	answers?:Answer[];
	questions?:Question[];
	date?:string;
	time?:string;
	consent?:boolean;
}