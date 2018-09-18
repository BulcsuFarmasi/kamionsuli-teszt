import { Component, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { FillService } from '../../../../../../services/fill.service';
import { TestService } from '../../../../../../services/test.service';
import { Subscription } from 'rxjs';

@Component({
	selector:'valuation',
	templateUrl:'./valuation.component.html',
	styleUrls: ['./valuation.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ValuationComponent implements OnInit, OnDestroy {
	@Output() onBackToTest:EventEmitter<any>=new EventEmitter();
	valued:boolean;
	valuing:boolean;
	private valuateSubscription:Subscription; 

	constructor(public testService:TestService, private fillService:FillService){};

	ngOnInit(){
		this.valued=false;
		this.valuing = false;
	}

	ngOnDestroy () {
		this.valuateSubscription.unsubscribe();
	}

	backToTest(){
		this.onBackToTest.emit();
	}

	sendTest(){
		this.valuing = true;
		this.valuateSubscription = this.testService.valuate(this.fillService.getId()).subscribe(() => {
			this.valued = true;
			this.valuing = false;
		});
	}
};