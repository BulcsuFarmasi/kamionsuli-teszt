import {Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChildren, QueryList} from '@angular/core';

import { PageComponent } from '../page/page.component';

import { FillService } from "../../../../../../services/fill.service";
import { TestService } from '../../../../../../services/test.service';
import { QuestionService } from '../../../../../../services/question.service';
import { Page } from '../../../../../../models/page'

@Component({
	selector:'questions',
	templateUrl:'./questions.component.html',
	providers:[QuestionService]
})

export class QuestionsComponent implements OnInit, AfterViewInit{

	public pageNumber:number;
	public pages:Page[];
	public currentPage:number
	public questionsObject:Object;
	public pageComponents:PageComponent[];
	@Output() onBackToStart:EventEmitter<any>=new EventEmitter();
	@Output() onGoToValuation:EventEmitter<any>=new EventEmitter();
	@ViewChildren(PageComponent)
	private pageComponentList:QueryList<PageComponent>;

	constructor(private testService:TestService, private questionService:QuestionService,
				private fillService:FillService){
		this.pages=[];
		this.currentPage=0;
	}
	
	ngOnInit(){
		this.questionService.getQuestionsObject(this.testService.getId(),false,false).then(function(questions){
			this.questionsObject=questions;
			this.pageNumber=this.questionsObject.questions.length/this.questionsObject.pageQuestionNumber;
			this.questionService.setQuestions(this.questionsObject.questions);
			for(let i=0; i< this.questionsObject.questions.length; i+=this.questionsObject.pageQuestionNumber){
				let page=new Page();
				page.time = this.questionsObject.pageTime;
				page.questions = [];
				page.questions.push(...this.questionsObject.questions.slice(i,i+this.questionsObject.pageQuestionNumber));
				this.pages.push(page);
			}
		}.bind(this));
	}

	ngAfterViewInit(){
		this.pageComponentList.changes.subscribe(() => {
			if (this.pageComponentList.toArray().length == this.pageNumber){
				this.pageComponents = this.pageComponentList.toArray();
				if (this.currentPage > 1){
					this.pageComponents[this.currentPage - 1].startCountdown();
				}
			}
		})
	}

	goToValuation(){
		this.testService.setQuestions(this.questionService.getQuestions());
		this.pageComponents[this.currentPage - 1].saveAnswers(this.fillService.getId());
		this.pageComponents[this.currentPage - 1].stopCountdown();
		this.onGoToValuation.emit();
	}

	prevPage(){
		this.currentPage--;
	}

	nextPage(){
		this.stopPreviousPage();
		this.startNextPage();
	}

	startCountdown () {
		this.pageComponents[this.currentPage - 1].startCountdown();
	}

	startNextPage () {
		if (this.currentPage < this.pageNumber) {
			this.currentPage++;
			this.startCountdown();
		}  else {
				this.goToValuation();
		}
	}

	stopPreviousPage () {
		if (this.currentPage > 0 && this.currentPage < this.pageNumber) {
			this.pageComponents[this.currentPage - 1].saveAnswers(this.fillService.getId());
			this.pageComponents[this.currentPage - 1].stopCountdown();
		}
	}

	backToStart(){
		this.onBackToStart.emit();
	}

	timeExpired() {
		this.nextPage();
	}
};