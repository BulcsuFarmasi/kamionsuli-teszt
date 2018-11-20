import { Component, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { FillService } from '../../../../../../services/fill.service';
import { TestService } from '../../../../../../services/test.service';
import { QuestionService } from 'src/app/services/question.service';
import { Subscription } from 'rxjs';

@Component({
	selector:'valuation',
	templateUrl:'./valuation.component.html',
	styleUrls: ['./valuation.component.scss'],
	encapsulation: ViewEncapsulation.None
})


export class ValuationComponent implements OnInit, OnDestroy {
	@Output() onBackToTest:EventEmitter<any>=new EventEmitter();
	@Output() onGoToWrongQuestions:EventEmitter<string>=new EventEmitter();
	valued:boolean;
	valuing:boolean;
	private valuateSubscription:Subscription; 

	constructor(public testService:TestService, private fillService:FillService, private questionService:QuestionService){};

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

	goToWrongQuestions() {
		this.onGoToWrongQuestions.emit('wrong questions')
	}

	sendTest(){
		this.valuing = true;
		this.valuateSubscription = this.testService.valuate(this.fillService.getId()).subscribe(() => {
			this.valued = true;
			this.valuing = false;
			this.testService.setQuestions(this.questionService.findAnsweredCorrectly(this.testService.test.questions));
		});
	}
};