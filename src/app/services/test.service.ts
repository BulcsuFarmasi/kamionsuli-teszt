import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { JwtService } from './jwt-service'
import { PersonalQuestion } from '../models/personal-question';
import { Question } from '../models/question';
import { Test } from '../models/test';

@Injectable()
export class TestService{
	public test:Test;
	public tests:Test[];
	constructor(private http:Http, private jwtService:JwtService){}

	addTest () {
		return this.jwtService.get('../api/public/test/addTest').toPromise()
			.then(response => {
				let json = response.json();
				return json.id;
			});
	}

	copyTest (id) {
		return this.jwtService.post('../api/public/test/copyTest', {id: id}).toPromise()
			.then(respone => {
				let json = respone.json();
				let test:Test = {
					id : json.id,
					name : json.name
				};
				return test;
			});
	}

	deleteTest (id) {
		return this.jwtService.post('../api/public/test/deleteTest', {id: id}).toPromise();
	}

	getAnswerById(id:number,questions:Question[]){
		for(let question of questions){
			for(let answer of question.answers){
				if(answer.id == id){
					return answer;
				}
			}
		}
	}

	getId():number {
		return this.test.id;
	}

	getIndexById(id:number, tests:Test[]):number {
		return tests.findIndex((test) => {
			if (test.id == id) {
				return true;
			}
		})
	}

	getStartData(admin:boolean = false){
		var up=(admin) ? '../' : '';
		return this.http.get(`${up}api/public/test/${this.test.id}/getStartData`)
		.toPromise()
		.then(response => {
			var test=response.json();
			this.test.name = test.name;
			this.test.description = test.description;
			this.test.fillable = test.fillable;
			this.test.remainingSeconds = test.remainingSeconds;
			this.test.startTime = new Date(test.startTime * 1000);
			this.test.endTime = new Date(test.endTime * 1000);
			return this.test;
		});
	}

	getPageQuestionNumber():number{
		return this.test.pageQuestionNumber;
	}

	getPersonalQuestionById(id:number,personalQuestions:PersonalQuestion[]){
		for(let personalQuestion of personalQuestions){
			if(personalQuestion.id == id){
				return personalQuestion;
			}
		}
	}

	getPersonalQuestions():PersonalQuestion[]{
		return this.test.personalQuestions;
	}

	getQuestions():Question[]{
		return this.test.questions;
	}

	getTests(trash:boolean){
		this.tests=[];
		return this.jwtService.post('../api/public/test/getTests', {trash: trash})
		.toPromise()
		.then(response => {
			var tests=response.json();
			for(let i=0;i<tests.length;i++){
				var test:Test = {
					id:tests[i].id,
					name:tests[i].name
				}
				this.tests.push(test);
			}
			return this.tests;
		})
	}

    saveDescription(){
        this.jwtService.post('../api/public/test/saveDescription',{id:this.test.id,description:this.test.description}).toPromise();
    }

	saveName(){
		this.jwtService.post('../api/public/test/saveName',{id:this.test.id,name:this.test.name}).toPromise();
	}

	saveAnswerText(id:number, text:string){
		this.jwtService.post('../api/public/answer/saveText',{id:id,text:text}).toPromise();
	}

	saveAnswerScore(id:number, score:number){
		this.jwtService.post('../api/public/answer/saveScore',{id:id,score:score}).toPromise();
	}


	saveQuestionText(id:number, text:string){
		this.jwtService.post('../api/public/question/saveText',{id:id,text:text}).toPromise();
	}

	saveQuestionType(id:number, type:string){
		this.jwtService.post('../api/public/question/saveType',{id:id,type:type}).toPromise();
	}

	savePageQuestionNumber(){
		this.jwtService.post('../api/public/test/savePageQuestionNumber',{id:this.test.id,pageQuestionNumber:this.test.pageQuestionNumber}).toPromise();
	}

	savePageTime () {
		this.jwtService.post('../api/public/test/savePageTime',{id:this.test.id,pageTime:'00:' + this.test.pageTime}).toPromise();
	}

	saveStartTime () {
		this.jwtService.post('../api/public/test/saveStartTime', {id:this.test.id,startTime:this.test.startTime}).toPromise();
	}

	saveEndTime () {
		this.jwtService.post('../api/public/test/saveEndTime', {id:this.test.id,endTime:this.test.endTime}).toPromise();
	}

	savePersonalQuestionName(id:number,name:string){
		this.jwtService.post('../api/public/personalData/savePersonalQuestionText',{id:id,text:name}).toPromise();
	}

	savePersonalQuestionType(id:number,typeId:number){
		this.jwtService.post('../api/public/personalData/savePersonalQuestionType',{id:id,typeId:typeId}).toPromise();
	}

	setId(id:number){
		this.test.id=id;
	}
	setName(name:string){
		this.test.name=name;
	}

	setDescription(description:string){
		this.test.description=description;
	}

	setPageTime (pageTime:string) {
		this.test.pageTime = pageTime;
	}

	setStartTime (startTime) {
		this.test.startTime = startTime
	}

	setEndTime (endTime) {
		this.test.endTime = endTime
	}

	setPageQuestionNumber(pageQuestionNumber){
		this.test.pageQuestionNumber=pageQuestionNumber;
	}
	setPersonalQuestions(personalQuestions:PersonalQuestion[]){
		this.test.personalQuestions=personalQuestions;
	}

	setQuestions(questions:Question[]){
		this.test.questions=questions;
	}

	trashTest (id:number){
		return this.jwtService.post('../api/public/test/trashTest', {id: id}).toPromise();
	}

	untrashTest (id:number){
		return this.jwtService.post('../api/public/test/untrashTest', {id: id}).toPromise();
	}

	valuate(fillId:number){
		return this.http.post('api/public/test/valuate', {fillId: fillId, test: this.test})
		.toPromise()
		.then(response => {
				var result=response.json();
				this.test.score=parseFloat(result.score);
				this.test.totalScore=parseFloat(result.totalScore);
				this.test.time = result.time;
				for(let question of this.test.questions){
					question.answers=question.answers.map(answer => {
						for(let resultAnswer of result.answers){
							if(answer.id === resultAnswer.id){
								answer.score=resultAnswer.score;
								return answer;
							}
						}
					})
				}
		})
	}
}