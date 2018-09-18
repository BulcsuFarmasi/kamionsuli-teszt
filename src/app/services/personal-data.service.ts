import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { PersonalQuestion } from '../models/personal-question';
import { PersonalType } from '../models/personal-type';

import { NetworkService } from './network.service';

@Injectable()
export class PersonalDataService{
	private personalQuestions:PersonalQuestion[];
	private personalTypes:PersonalType[]
	constructor(private networkService:NetworkService){
		this.personalQuestions=[];
		this.personalTypes=[];
	};
	getPersonalData(testId:number,admin:boolean=false):Observable<PersonalQuestion[]>{
		return this.networkService.get(`apersonalData/${testId}/getPersonalQuestions/${admin}`)
		.pipe(
			map((personalQuestions:any[]) => {
				for(let question of personalQuestions){
					let personalQuestion:PersonalQuestion = {
						id:question.id,
						name:question.text,
						type:question.type
					}
					this.personalQuestions.push(personalQuestion);
				}
				return this.personalQuestions;
			})
		)
	}
	getPersonalQuestions():PersonalQuestion[]{
		return this.personalQuestions;
	}

	getPersonalTypes(){
		return this.networkService.get('personalData/getPersonalTypes')
		.pipe(
			map((personalTypes:PersonalType[]) => {
				this.personalTypes = personalTypes;
				return this.personalTypes;
			})
		)
	}

	getTypeNameById(id:number){
		for(let type of this.personalTypes){
			if(type.id == id){
				return type.name;
			}
		}
	}

	savePersonalData(fillId:number) {
		return this.networkService.post('personalData/savePersonalData',{fillId: fillId,
			personalData: this.personalQuestions});
	}

	getPersonalQuestionIndexById (id:number, personalQuestions:PersonalQuestion[]) {
		return personalQuestions.findIndex((personalQuestion) => {
			if (personalQuestion.id == id) {
				return true;
			}
		})
	}

	deletePersonalQuestion (id:number) {
		return this.networkService.delete('personalData/' + id);
	}

	addPersonalQuestion (testId: number) {
		return this.networkService.post('../api/public/personalData/addPersonalQuestion', {testId: testId})
			.pipe(map((response:any) => {
				let personalType:PersonalType = {
					id: response.type_id,
					name: this.getTypeNameById(response.type_id)
				} 
				let personalQuestion:PersonalQuestion = {
					id: response.id,
					name: response.text,
					type: personalType
				};
				
				this.personalQuestions.push(personalQuestion);
				return personalQuestion;
			}))
	}

	savePersonalQuestionName(id:number,name:string){
		return this.networkService.patch('personalData/savePersonalQuestionText',{id:id,text:name});
	}

	savePersonalQuestionType(id:number,typeId:number){
		return this.networkService.patch('personalData/savePersonalQuestionType',{id:id,typeId:typeId});
	}
}