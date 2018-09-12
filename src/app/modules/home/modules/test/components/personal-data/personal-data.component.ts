import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { FillService } from '../../../../../../services/fill.service';
import { TestService } from '../../../../../../services/test.service';
import { PersonalDataService } from '../../../../../../services/personal-data.service';
import { PersonalQuestion } from '../../../../../../models/personal-question';


@Component({
	selector:'personal-data',
	templateUrl:'./personal-data.component.html',
	styleUrls:['./personal-data.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class PersonalDataComponent implements OnInit{
	public personalQuestions:PersonalQuestion[] = [];
	public consent:boolean;
	
	@Output() onValidity:EventEmitter<boolean>=new EventEmitter();
	
	constructor(private testService:TestService, private personalDataService:PersonalDataService, 
		private fillService:FillService){};
	
	ngOnInit(){
		this.personalDataService.getPersonalData(this.testService.getId())
		.then(function(questions){
			this.personalQuestions=questions;
		}.bind(this));
	};
	
	checkValidity(){
		let valid=true;
		for (let personalQuestion of this.personalQuestions) {
			console.log(personalQuestion);
			if (personalQuestion.answer == "" || !personalQuestion.answer){
					valid=false;
					break;
			}
			if (personalQuestion.type.type == "email" && !this.checkEmail(personalQuestion.answer)){
					valid=false;
					break;
				}
		}
			// check consent
			valid = valid && this.consent;
			this.onValidity.emit(valid);
		
	}

	consentChanged () {
		this.fillService.setConsent(this.consent);
		this.checkValidity();
	}

	checkEmail(email) {
		if (!email) {
			return true;
		}
		var pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
		return pattern.test(email);
	}
};