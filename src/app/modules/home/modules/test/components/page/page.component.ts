import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';


import { Subscription } from 'rxjs';


import { Page } from '../../../../../../models/page';

import { AnswerService } from "../../../../../../services/answer.service";

@Component({
	selector:'page',
	templateUrl:'./page.component.html'
})

export class PageComponent implements OnInit, OnDestroy{
	@Input() page:Page;
	private saveAnswerSubscription:Subscription
	constructor(private answerService:AnswerService){}


	ngOnInit(){

	}

	ngOnDestroy () {
		this.saveAnswerSubscription.unsubscribe();
	}

	saveAnswers(fillId) {
		this.saveAnswerSubscription = this.answerService.saveAnswers(fillId, this.page.questions).subscribe();
	}
};