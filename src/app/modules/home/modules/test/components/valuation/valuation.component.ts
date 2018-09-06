import { Component, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';

import { FillService } from '../../../../services/fill.service';
import { TestService } from '../../../../services/test.service';

@Component({
	selector:'valuation',
	templateUrl:'./valuation.component.html',
	styleUrls: ['./valuation.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ValuationComponent{
	@Output() onBackToTest:EventEmitter<any>=new EventEmitter();
	public valued:boolean;
	public valuing:boolean;

	constructor(public testService:TestService, private fillService:FillService){};

	ngOnInit(){
		this.valued=false;
		this.valuing = false;
	}

	backToTest(){
		this.onBackToTest.emit();
	}

	sendTest(){
		this.valuing = true;
		this.testService.valuate(this.fillService.getId()).then(function(){
			this.valued = true;
			this.valuing = false;
		}.bind(this))
	}
};