import {Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChildren, QueryList, OnDestroy, ViewChild } from '@angular/core';


import { Subscription } from 'rxjs';


import { PageComponent } from '../page/page.component';
import { TimerComponent } from '../timer/timer.component';
import { FillService } from "../../../../../../services/fill.service";
import { TestService } from '../../../../../../services/test.service';
import { QuestionService } from '../../../../../../services/question.service';
import { Page } from '../../../../../../models/page'
import { Test } from '../../../../../../models/test';

@Component({
	selector:'questions',
	templateUrl:'./questions.component.html',
	providers:[QuestionService]
})

export class QuestionsComponent implements AfterViewInit, OnInit, OnDestroy {

	public pageNumber:number;
	public pages:Page[];
	public currentPage:number
	public questionsObject:any;
	public pageComponents:PageComponent[];
	test:Test;
	time:string;
	@Output() onBackToStart:EventEmitter<any>=new EventEmitter();
	@Output() onGoToValuation:EventEmitter<any>=new EventEmitter();
	@ViewChildren(PageComponent)
	private pageComponentList:QueryList<PageComponent>;
	@ViewChild(TimerComponent)
	timerComponent:TimerComponent;
	private getQuestionsObjectSubscription:Subscription

	constructor(private testService:TestService, private questionService:QuestionService,
				private fillService:FillService){
		this.pages=[];
		this.currentPage=0;
	}
	
	ngOnInit(){
		this.test = this.testService.getTest();
		this.getQuestionsObjectSubscription = this.questionService.getQuestionsObject(this.test.id,false)
		.subscribe((questions:any[]) => {
			this.questionsObject = questions;
			this.time = this.questionsObject.time;
			this.pageNumber = this.questionsObject.questions.length / this.questionsObject.pageQuestionNumber;
			this.questionsObject.questions = this.questionService.randomizeQuestions(this.questionsObject.questions);
			this.questionService.setQuestions(this.questionsObject.questions);
			for(let i=0; i< this.questionsObject.questions.length; i+=this.questionsObject.pageQuestionNumber){
				let page:Page = {
					questions: []
				}
				page.questions.push(...this.questionsObject.questions.slice(i,i+this.questionsObject.pageQuestionNumber));
				this.pages.push(page);
			}
		})
	}

	ngOnDestroy () {
		this.getQuestionsObjectSubscription.unsubscribe();
	}

	ngAfterViewInit(){
		this.pageComponentList.changes.subscribe(() => {
			if (this.pageComponentList.toArray().length == this.pageNumber){
				this.pageComponents = this.pageComponentList.toArray();
			}
		})
	}

	goToValuation(){
		this.testService.setQuestions(this.questionService.getQuestions());
		this.pageComponents[this.currentPage - 1].saveAnswers(this.fillService.getId());;
		this.onGoToValuation.emit();
		console.log('a');
	}

	prevPage(){
		this.currentPage--;
	}

	nextPage(){
		this.stopPreviousPage();
		this.startNextPage();
	}

	startNextPage () {
		if (this.currentPage == 0) {
			this.timerComponent.startCountDown();
		}
		if (this.currentPage < this.pageNumber) {
			this.currentPage++;
		}  else {
			this.goToValuation();
		}
	}

	stopPreviousPage () {
		if (this.currentPage > 0 && this.currentPage < this.pageNumber) {
			this.pageComponents[this.currentPage - 1].saveAnswers(this.fillService.getId());
		}
	}

	backToStart(){
		this.onBackToStart.emit();
	}

	timeExpired() {
		this.nextPage();
	}
};