import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';


import { Subscription } from 'rxjs';


import { TestService } from '../../../../../../services/test.service';
import { FillService } from "../../../../../../services/fill.service";
import { Test } from "../../../../../../models/test";
import { switchMap } from 'rxjs/operators';

@Component({
	selector:'start',
	templateUrl:'./start.component.html',
	styleUrls: ['./start.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class StartComponent implements OnInit, OnDestroy {
	public test:Test;
	@Output() onStartTest:EventEmitter<any>=new EventEmitter();
	private getStartDataSubscription:Subscription;
	private createFillSubscription:Subscription;

	constructor(private testService:TestService,
	private fillService:FillService){};

	ngOnInit(){
		this.getStartDataSubscription = this.testService.getStartData().subscribe((test:Test) => {this.test = test});
	}

	ngOnDestroy () {
		this.getStartDataSubscription.unsubscribe();
		this.createFillSubscription.unsubscribe();
	}

	startTest(){
		let test = this.testService.getTest();
		this.createFillSubscription = this.fillService.createFill(test.id)
		.subscribe(() => {
			return this.fillService.saveConsent();
		})
		this.onStartTest.emit();
	}

}