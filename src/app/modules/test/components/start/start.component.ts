import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { TestService, Test } from '../../../../services/test.service';
import { PersonalDataService } from '../../../../services/personal-data.service';
import { FillService } from "../../../../services/fill.service";

@Component({
	selector:'start',
	templateUrl:'./start.component.html',
	styleUrls: ['./start.component.scss'],
	providers:[PersonalDataService],
	encapsulation: ViewEncapsulation.None
})

export class StartComponent implements OnInit{
	public validPersonalData:boolean
	public test:Test=new Test();
	@Output() onStartTest:EventEmitter<any>=new EventEmitter();
	constructor(private testService:TestService,private personalDataService:PersonalDataService,
	private fillService:FillService){};
	ngOnInit(){
		this.testService.getStartData().then(test => this.test=test);
		this.validPersonalData=false;
	}
	startTest(){
		this.fillService.createFill(this.testService.getId()).then(() => {
			this.fillService.saveConsent();
			this.personalDataService.savePersonalData(this.fillService.getId());
			this.testService.setPersonalQuestions(this.personalDataService.getPersonalQuestions())
		});
		this.onStartTest.emit();
	}
	onValidity(valid:boolean){
		this.validPersonalData=valid;
	}

}