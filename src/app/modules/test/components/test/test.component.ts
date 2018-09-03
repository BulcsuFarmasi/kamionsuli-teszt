import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { QuestionsComponent } from '../questions/questions.component';
import { StartComponent } from '../start/start.component';

import { TestService } from '../../../../services/test.service';
import {FillService} from "../../../../services/fill.service";


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
	constructor(private route:ActivatedRoute,private testService:TestService,
				private fillService:FillService){
		this.currentState='start';
	}
	ngOnInit():void{
		this.route.params.forEach((params:Params) => {
			this.testService.setId(parseInt(params['testId']));
		})
	}

	onStartTest(){
		this.currentState="questions";
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