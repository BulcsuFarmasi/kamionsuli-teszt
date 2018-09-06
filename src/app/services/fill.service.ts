import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import { Answer } from '../models/answer';
import { Fill } from  '../models/fill';
import { JwtService } from './jwt-service'
import { PersonalData } from '../models/personal-data';
import { PersonalQuestion } from '../models/personal-question';
import { PersonalType } from '../models/personal-type';
import { Question } from "../models/question";

@Injectable()
export class FillService{
	public fill:Fill;
	constructor(private jwtService:JwtService, private http:Http){}

	getFills(testId:number){
		return this.jwtService.get(`../api/public/fill/${testId}/getFills`)
		.toPromise()
		.then(response => {
			var body=response.json();
			var personalData:PersonalData = {
				types:[],
				typeNames:[]
			};
			for(let responseQuestion of body.personalDataTypes){
				var type:PersonalType = {
					name:responseQuestion.order_name
				}
				var question:PersonalQuestion = {
					id:parseInt(responseQuestion.id),
					name:responseQuestion.text,
					type: type
				};
				personalData.types.push(question);
			}
			
			personalData.fills=[];
			for(let responseFill of body.fills){
				var fill:Fill = {
					id:parseInt(responseFill.id),
					score:parseFloat(responseFill.score),
					date:responseFill.created_at,
					time:responseFill.time
				}
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
			let fill:Fill = {
				personalQuestions: json.personalQuestions,
				questions: json.questions
			};
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