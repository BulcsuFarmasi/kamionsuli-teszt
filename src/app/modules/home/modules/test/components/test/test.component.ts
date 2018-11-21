import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { QuestionsComponent } from '../questions/questions.component';
import { StartComponent } from '../start/start.component';

import { TestService } from '../../../../../../services/test.service';


@Component({
	selector: 'test',
	templateUrl:'./test.component.html',
	styleUrls:['./test.component.scss'],
	encapsulation: ViewEncapsulation.None
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
		this.questionsComponent.nextPage();
	}

	onBackToStart(){
		this.currentState="start";
	}

	onGoToValuation(){
		this.currentState="valuation";
	}

	onGoToWrongQuestions (state:string) {
		this.currentState = state;
	}

	onBackToTest(){
		this.currentState="questions";
	}

}