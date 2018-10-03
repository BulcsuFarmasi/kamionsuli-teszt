import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { FillService } from '../../../../../../services/fill.service';
import { Fill } from '../../../../../../models/fill';


@Component({
	templateUrl:'./fills.component.html',
})

export class FillsComponent implements OnInit, OnDestroy{
	public testId:number;
	public fills:Fill[];
	private getFillsSubscription:Subscription;

	constructor(private fillService:FillService, private router:Router, private route:ActivatedRoute){}

	ngOnInit(){
		if (this.route.snapshot.paramMap.get('testId')) {
			this.testId = +this.route.snapshot.paramMap.get('testId');
		}
		let getFills =  (this.testId) ? this.fillService.getFills(this.testId) : this.fillService.getFills();
		this.getFillsSubscription = getFills.subscribe((fills:Fill[]) => {
			this.fills=fills;
		});
	}

	ngOnDestroy () {
		this.getFillsSubscription.unsubscribe();
	}

	orderAsc(type:string){
		this.fills.sort(function(a,b){
			if(a[type] < b[type]){
				return -1;
			}else if(a[type] > b[type]){
				return 1;
			}
			return 0;
		})
	}

	orderDesc(type:string){
		this.fills.sort(function(a,b){
			if(a[type] > b[type]){
				return -1;
			}else if(a[type] < b[type]){
				return 1;
			}
			return 0;
		})
	}	
}