import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { FillService, Fill } from '../services/fill.service';
import { PersonalQuestion } from '../services/personal-data.service';

@Component({
	templateUrl:'./fills.component.html',
})

export class FillsComponent implements OnInit{
	public testId:number;
	public fills:Fill[];
	public personalDataTypes:PersonalQuestion[];
	private personalDataTypeNames:string[];

	constructor(private fillService:FillService, private router:Router, private route:ActivatedRoute){}

	ngOnInit(){
		this.route.params.forEach((params:Params) => {
			this.fillService.getFills(parseInt(params['testId']))
			.then(personalData => {
				this.fills=personalData.fills;
				this.personalDataTypes=personalData.types;
				console.log(this.fills, this.personalDataTypes);
			});
			this.testId = params['testId'];
		})
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