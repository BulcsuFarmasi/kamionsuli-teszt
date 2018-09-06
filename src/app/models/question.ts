import { Answer } from './answer'

export interface Question{
	id:number;
	text:string;
	answers:Answer[];
	time?:string
	type:string;
	images:any;
}