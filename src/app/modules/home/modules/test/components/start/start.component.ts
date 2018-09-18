import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';


import { Subscription } from 'rxjs';


import { TestService } from '../../../../../../services/test.service';
import { PersonalDataService } from '../../../../../../services/personal-data.service';
import { FillService } from "../../../../../../services/fill.service";
import { Test } from "../../../../../../models/test";
import { switchMap } from 'rxjs/operators';

@Component({
	selector:'start',
	templateUrl:'./start.component.html',
	styleUrls: ['./start.component.scss'],
	providers:[PersonalDataService],
	encapsulation: ViewEncapsulation.None
})

export class StartComponent implements OnInit, OnDestroy {
	public validPersonalData:boolean
	public test:Test;
	@Output() onStartTest:EventEmitter<any>=new EventEmitter();
	private getStartDataSubscription:Subscription;
	private createFillSubscription:Subscription;

	constructor(private testService:TestService,private personalDataService:PersonalDataService,
	private fillService:FillService){};

	ngOnInit(){
		this.getStartDataSubscription = this.testService.getStartData().subscribe((test:Test) => {this.test = test});
		this.validPersonalData=false;
	}

	ngOnDestroy () {
		this.getStartDataSubscription.unsubscribe();
		this.createFillSubscription.unsubscribe();
	}

	startTest(){
		let test = this.testService.getTest();
		this.createFillSubscription = this.fillService.createFill(test.id)
		.pipe(
			switchMap(() => {
				return this.fillService.saveConsent();
			}),
			switchMap(() => {
				return this.personalDataService.savePersonalData(this.fillService.getId());
			})
		)
		.subscribe(() => {
			this.testService.setPersonalQuestions(this.personalDataService.getPersonalQuestions())
		})
		this.onStartTest.emit();
	}

	onValidity(valid:boolean){
		this.validPersonalData=valid;
	}

}