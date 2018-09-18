import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { Answer } from '../models/answer';
import { Fill } from  '../models/fill';
import { JwtService } from './jwt.service'
import { PersonalData } from '../models/personal-data';
import { PersonalQuestion } from '../models/personal-question';
import { PersonalType } from '../models/personal-type';
import { Question } from "../models/question";
import { NetworkService } from './network.service';

@Injectable()
export class FillService{
	public fill:Fill;
	constructor(private networkService:NetworkService){}

	getFills(testId:number){
		return this.networkService.get(`../api/public/fill/${testId}/getFills`)
		.pipe(
			map((response:any) => {
				var personalData:PersonalData = {
					types:[],
					typeNames:[]
				};
				for(let responseQuestion of response.personalDataTypes){
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
				for(let responseFill of response.fills){
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
		)
	}

	getFill(id:number){
		return this.networkService.get(`../api/public/fill/${id}/getFill`)
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
		return this.networkService.get(`api/public/fill/${testId}/createFill`)
			.pipe(
				tap((fill:Fill) => {
					this.fill.id = fill.id
				})
			)
	}

	saveConsent () {
		return this.networkService.patch(`api/public/fill/saveConsent`, {fill:this.fill});
	}
}