import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { Answer } from '../models/answer';
import { Fill } from  '../models/fill';
import { JwtService } from './jwt.service'
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
				let fills = [];
				for(let responseFill of response.fills){
					var fill:Fill = {
						id:parseInt(responseFill.id),
						score:parseFloat(responseFill.score),
						date:responseFill.created_at,
						time:responseFill.time
					}
					fills.push(fill);
	
				}
	
				return fills;
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