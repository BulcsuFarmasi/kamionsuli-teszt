import { Injectable } from '@angular/core';


import { map, tap } from 'rxjs/operators';


import { Fill } from  '../models/fill';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';

@Injectable()
export class FillService{
	public fill:Fill = {};
	constructor(private networkService:NetworkService){}

	getFills(testId?:number){
		return (testId) ? this.networkService.get(`fill/${testId}/getFills`) : this.networkService.get('fills');
	}

	getFill(id:number){
		return this.networkService.get('fill/' + id);
	}

	getId ():number {
		return this.fill.id;
	}

	setId (id) {
		this.fill.id = id;
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