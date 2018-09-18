import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';


import { Subscription } from 'rxjs';


import { Page } from '../../../../../../models/page';

import { TimeService } from '../../../../../../services/time.service'
import { AnswerService } from "../../../../../../services/answer.service";

@Component({
	selector:'page',
	templateUrl:'./page.component.html',
	providers:[TimeService]
})

export class PageComponent implements OnInit, OnDestroy{
	@Input() page:Page;
	@Output() timeexpired:EventEmitter<any> = new EventEmitter();
	private timer:any;
	private countUpSeconds;
	private saveAnswerSubscription:Subscription
	constructor(private timeService:TimeService, private answerService:AnswerService){}


	ngOnInit(){
		this.page.time=this.page.time.substring(3);
	}

	ngOnDestroy () {
		this.saveAnswerSubscription.unsubscribe();
	}

	startCountdown(){
		var countDownSeconds=this.timeService.stringToSeconds(this.page.time);
		this.countUpSeconds = 0;
		this.timer = setInterval(() => {
			if(countDownSeconds === 0){
				clearInterval(this.timer);
				this.timer = false;
				this.timeexpired.emit();
			}
			countDownSeconds--;
			this.countUpSeconds++;
			this.page.time = this.timeService.secondsToString(countDownSeconds);
		}, 1000)
	}

	stopCountdown () {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	saveAnswers(fillId) {
		let averageTime = this.timeService.secondsToString(this.countUpSeconds / this.page.questions.length);
		averageTime = '00:' + averageTime;
		this.page.questions.forEach((question) => {
			question.time = averageTime;
		})
		this.saveAnswerSubscription = this.answerService.saveAnswers(fillId, this.page.questions).subscribe();
	}
};