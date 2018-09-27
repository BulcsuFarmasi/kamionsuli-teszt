import { Injectable } from '@angular/core';


import { map, tap } from 'rxjs/operators';


import { Fill } from  '../models/fill';
import { NetworkService } from './network.service';

@Injectable()
export class FillService{
	public fill:Fill = {};
	constructor(private networkService:NetworkService){}

	getFills(testId:number){
		return this.networkService.get(`fill/${testId}/getFills`)
		.pipe(
			map((responseFills:any) => {
				let fills = [];
				for(let responseFill of responseFills){
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
	}

	createFill (testId:number, userId:number) {
		return this.networkService.post('fill', {testId, userId})
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