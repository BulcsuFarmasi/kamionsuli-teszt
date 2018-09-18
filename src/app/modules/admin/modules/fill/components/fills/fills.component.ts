import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { FillService } from '../../../../../../services/fill.service';
import { Fill } from '../../../../../../models/fill';
import { PersonalQuestion } from '../../../../../../models/personal-question';


@Component({
	templateUrl:'./fills.component.html',
})

export class FillsComponent implements OnInit, OnDestroy{
	public testId:number;
	public fills:Fill[];
	public personalDataTypes:PersonalQuestion[];
	private personalDataTypeNames:string[];
	private getFillsSubscription:Subscription

	constructor(private fillService:FillService, private router:Router, private route:ActivatedRoute){}

	ngOnInit(){
		let testId = +this.route.snapshot.paramMap.get('testId');
		this.testId = testId;
		this.getFillsSubscription = this.fillService.getFills(testId)
			.subscribe(personalData => {
				this.fills=personalData.fills;
				this.personalDataTypes=personalData.types;
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