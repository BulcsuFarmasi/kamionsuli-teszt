import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { QuestionsComponent } from '../questions/questions.component';
import { StartComponent } from '../start/start.component';

import { TestService } from '../../../../../../services/test.service';


@Component({
	templateUrl:'./test.component.html',
})

export class TestComponent implements OnInit{
	public currentState:string;
	public passedSeconds:number;
	@ViewChild(QuestionsComponent)
	private questionsComponent:QuestionsComponent;
	@ViewChild(StartComponent)
	private startComponent:StartComponent;
	constructor(private route:ActivatedRoute,private testService:TestService){
		this.currentState='start';
	}
	ngOnInit():void{
		this.testService.setId(+this.route.snapshot.paramMap.get('id'));
	}

	onStartTest(){
		this.currentState="questions";
		console.log(this.questionsComponent);
		this.questionsComponent.nextPage();
		this.startCountdown();
	}

	onBackToStart(){
		this.currentState="start";
	}

	onGoToValuation(){
		this.currentState="valuation";
	}

	onBackToTest(){
		this.currentState="questions";
	}

	startCountdown () {
		this.passedSeconds = 0;
		var timer = setInterval(() => {
			this.startComponent.test.remainingSeconds--;
			this.passedSeconds++;
			if (this.startComponent.test.remainingSeconds == 0){
				this.onGoToValuation();
				clearInterval(timer);
			}
		}, 1000)
	}
}