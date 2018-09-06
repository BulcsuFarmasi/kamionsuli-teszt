import { Answer } from './answer';
import { Question } from './question';
import { PersonalQuestion } from './personal-question';


export interface Fill{
	id?:number;
	score?:number;
	answers?:Answer[];
	questions?:Question[];
	personalQuestions?:PersonalQuestion[];
	date?:string;
	time?:string;
	consent?:boolean;
}