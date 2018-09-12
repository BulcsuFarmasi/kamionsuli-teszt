import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { JwtService } from './jwt.service';

import { PersonalQuestion } from '../models/personal-question';
import { PersonalType } from '../models/personal-type';

@Injectable()
export class PersonalDataService{
	private personalQuestions:PersonalQuestion[];
	private personalTypes:PersonalType[]
	constructor(private http:Http, private jwtService:JwtService){
		this.personalQuestions=[];
		this.personalTypes=[];
	};
	getPersonalData(testId:number,admin:boolean=false):Promise<PersonalQuestion[]>{
		var up:string=(admin) ? '../' : '';
		return this.http.post(`${up}api/public/personalData/${testId}/getPersonalQuestions`,{admin:admin})
		.toPromise()
		.then(response => {
			for(let question of response.json()){
				let personalQuestion:PersonalQuestion = {
					id:question.id,
					name:question.text,
					type:question.type
				}
				this.personalQuestions.push(personalQuestion);
			}
			return this.personalQuestions;
		});
	}
	getPersonalQuestions():PersonalQuestion[]{
		return this.personalQuestions;
	}

	getPersonalTypes(){
		return this.http.get('../api/public/personalData/getPersonalTypes')
		.toPromise()
		.then(response => {
			for(let type of response.json()){
				let personalType:PersonalType = {
					id:type.id,
					name:type.name
				};
				this.personalTypes.push(personalType);
			}
			return this.personalTypes;
		})

	}

	getTypeNameById(id:number){
		for(let type of this.personalTypes){
			if(type.id == id){
				return type.name;
			}
		}
	}

	savePersonalData(fillId:number) {
		this.http.post('../api/public/personalData/savePersonalData',{fillId: fillId,
			personalData: this.personalQuestions}).toPromise();
	}

	getPersonalQuestionIndexById (id:number, personalQuestions:PersonalQuestion[]) {
		return personalQuestions.findIndex((personalQuestion) => {
			if (personalQuestion.id == id) {
				return true;
			}
		})
	}

	deletePersonalQuestion (id:number) {
		this.jwtService.post('../api/public/personalData/deletePersonalQuestion', {id: id}).toPromise();
	}

	addPersonalQuestion (testId: number) {
		/*return this.jwtService.post('../api/public/personalData/addPersonalQuestion', {testId: testId}).toPromise()
			.then(response => {
				let json = response.json();
				let personalType:PersonalType = {
					id: json.type_id,
					name: this.getTypeNameById(json.type_id)
				} 
				let personalQuestion:PersonalQuestion = {
					id: json.id,
					name: json.text,
					type: personalType
				};
				
				this.personalQuestions.push(personalQuestion);
			});*/
	}
}