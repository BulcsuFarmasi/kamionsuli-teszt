import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';


import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';


import { Test } from "../../../../../../models/test";

import { TestService } from '../../../../../../services/test.service';
import { FillService } from "../../../../../../services/fill.service";
import { UserService } from '../../../../../../services/user.service';

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

	constructor(private testService:TestService,
				private fillService:FillService,
				private userService:UserService){};

	ngOnInit(){
		this.getStartDataSubscription = this.testService.getStartData().subscribe((test:Test) => {this.test = test});
	}

	ngOnDestroy () {
		this.getStartDataSubscription.unsubscribe();
	}

	startTest(){
		let test = this.testService.getTest();
		this.userService.getUserSubject().pipe(
			switchMap((user) => {
				if (user.id) {
					console.log(user);
					return this.fillService.createFill(test.id, user.id)
				}
			})
		)
		.subscribe(() => {
			return this.fillService.saveConsent();
		})
		this.onStartTest.emit();
	}

}