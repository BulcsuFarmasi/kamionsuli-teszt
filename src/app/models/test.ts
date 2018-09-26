import { Question } from './question';

export interface Test{
	id:number;
	name?:string;
	description?:string;
	fillable?:boolean;
	startTime?:Date|number;
	endTime?:Date|number;
	time?:string;
	remainingSeconds?:number;
	questions?:Question[]
	score?:number;
	totalScore?:number;
	pageQuestionNumber?:number;
	pageTime?:string;
}