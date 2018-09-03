import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { JwtService } from './jwt-service';

export class PersonalQuestion{
	public id:number;
	public name:string;
	public type:PersonalType;
	public answer:string; 
}

export class PersonalType{
	public id:number;
	public name:string;
	public type:string;
	public regexp:string;
}

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
				let personalQuestion=new PersonalQuestion();
				personalQuestion.id=question.id;
				personalQuestion.name=question.text;
				personalQuestion.type=question.type;
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
				let personalType=new PersonalType();
				personalType.id=type.id;
				personalType.name=type.name
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
		return this.jwtService.post('../api/public/personalData/addPersonalQuestion', {testId: testId}).toPromise()
			.then(response => {
				let personalQuestion = new PersonalQuestion();
				let json = response.json();
				personalQuestion.id = json.id;
				personalQuestion.name = json.text;
				personalQuestion.type = new PersonalType();
				personalQuestion.type.id = json.type_id;
				personalQuestion.type.name = this.getTypeNameById(personalQuestion.type.id);

				this.personalQuestions.push(personalQuestion);
			});
	}
}