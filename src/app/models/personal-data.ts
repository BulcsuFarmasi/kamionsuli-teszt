import { PersonalQuestion } from './personal-question';
import { Fill } from './fill';

export interface PersonalData{
	types:PersonalQuestion[];
	typeNames:string[];
	fills?:Fill[];
}