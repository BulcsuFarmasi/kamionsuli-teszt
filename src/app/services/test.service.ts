import { Injectable } from '@angular/core';


import { map, tap } from 'rxjs/operators';


import { Question } from '../models/question';
import { Test } from '../models/test';

import { NetworkService } from './network.service';
import { Group } from '../models/group';
import { Observable } from 'rxjs';

@Injectable()
export class TestService{
	public test:Test = {};
	public tests:Test[];
	constructor(private networkService:NetworkService){}

	addTest () {
		return this.networkService.post('test/addTest', {});
	}

	copyTest (id) {
		return this.networkService.post('../api/public/test/copyTest', {id: id});
	}

	deleteTest (id) {
		return this.networkService.delete('test/' + id);
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

	getStartData(){
		return this.networkService.get(`test/${this.test.id}/getStartData`)
		.pipe(
			map((test:Test) => {
				this.test.name = test.name;
				this.test.description = test.description;
			return this.test;
			})
		)
	}

	getTest () {
		return this.test;
	}

	getTests(trash:boolean, groupTypeId:number):Observable<Test[]>{
		this.tests=[];
		return <Observable<Test[]>>this.networkService.get(`test/getTests/${trash}/${groupTypeId}`)
		.pipe(
			tap((tests:Test[]) => {this.tests = tests})
		)
	}

    saveDescription(){
        this.networkService.patch('test/saveDescription',{id:this.test.id,description:this.test.description});
    }

	saveName(){
		this.networkService.patch('test/saveName',{id:this.test.id,name:this.test.name});
	}
	
	savePageQuestionNumber(){
		this.networkService.patch('test/savePageQuestionNumber',{id:this.test.id,pageQuestionNumber:this.test.pageQuestionNumber}).toPromise();
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

	setPageQuestionNumber(pageQuestionNumber){
		this.test.pageQuestionNumber=pageQuestionNumber;
	}

	setQuestions(questions:Question[]){
		this.test.questions=questions;
	}

	trashTest (id:number){
		return this.networkService.patch('test/trashTest', {id: id});
	}

	untrashTest (id:number){
		return this.networkService.patch('test/untrashTest', {id: id});
	}

	valuate(fillId:number){
		return this.networkService.patch('test/valuate', {fillId: fillId, test: this.test})
		.pipe(
			map((result:any) => {
					this.test.score=parseFloat(result.score);
					this.test.totalScore=parseFloat(result.totalScore);
					this.test.time = result.time;
					for(let question of this.test.questions){
						question.answers=question.answers.map(answer => {
							for(let resultAnswer of result.answers){
								if(answer.id === resultAnswer.id){
									answer.correct = resultAnswer.correct;
									return answer;
								}
							}
						})
					}
			}))
	}
}