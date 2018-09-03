import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import { Answer } from './answer';
import { JwtService } from './jwt-service'
import { PersonalQuestion, PersonalType } from './personal-data.service';
import { Question } from "./question.service";

export class Fill{
	public id:number;
	public score:number;
	public answers:Answer[];
	public questions:Question[];
	public personalQuestions:PersonalQuestion[];
	public date:string;
	public time:string;
	public consent:boolean;
}

class PersonalData{
	public types:PersonalQuestion[];
	public typeNames:string[];
	public fills:Fill[];
}

@Injectable()
export class FillService{
	public fill:Fill = new Fill();
	constructor(private jwtService:JwtService, private http:Http){}

	getFills(testId:number){
		return this.jwtService.get(`../api/public/fill/${testId}/getFills`)
		.toPromise()
		.then(response => {
			var body=response.json();
			var personalData=new PersonalData();

		
			personalData.types=[];
			personalData.typeNames=[];
			for(let responseQuestion of body.personalDataTypes){
				var question=new PersonalQuestion();
				question.id=parseInt(responseQuestion.id);
				question.name=responseQuestion.text;
				question.type = new PersonalType();
				question.type.name=responseQuestion.order_name;
				personalData.types.push(question);
			}
			
			personalData.fills=[];
			for(let responseFill of body.fills){
				var fill=new Fill();
				fill.id=parseInt(responseFill.id);
				fill.score=parseFloat(responseFill.score);
				fill.date=responseFill.created_at;
				fill.time=responseFill.time;
				for(let personalDataType of personalData.types){
					fill[personalDataType.type.name]=responseFill[personalDataType.type.name];
				}
				personalData.fills.push(fill);

			}

			return personalData;
		})
	}

	getFill(id:number){
		return this.jwtService.post('../api/public/fill/getFill', {id: id})
		.toPromise()
		.then(response => {
			let json = response.json();
			let fill = new Fill();
			fill.personalQuestions = json.personalQuestions;
			fill.questions = json.questions;
			return fill;
		})
	}

	getId ():number {
		return this.fill.id;
	}

	setId (id) {
		this.fill.id = id;
	}

	setConsent(consent) {
		this.fill.consent = consent;
		console.log(this.fill);
	}

	createFill (testId:number) {
		return this.http.get(`api/public/fill/${testId}/createFill`)
			.toPromise()
			.then(response => {
				let fill = response.json();
				this.fill.id = fill.id;
			})
	}

	saveConsent () {
		this.http.post(`api/public/fill/saveConsent`, {fill:this.fill})
			.toPromise();
	}
}