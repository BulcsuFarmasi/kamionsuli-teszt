import { Question } from './question';

export interface Test{
	id?:number;
	name?:string;
	description?:string;
	time?:string;
	questions?:Question[]
	score?:number;
	totalScore?:number;
	pageQuestionNumber?:number;
}