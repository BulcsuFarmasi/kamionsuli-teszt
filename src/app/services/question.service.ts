import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtService } from './jwt-service'

import { Answer } from '../models/answer';
import { Question } from '../models/question';

@Injectable()
export class QuestionService{
	private questions:Question[];
	constructor(private http:Http, private jwtService:JwtService){};
	getQuestions(){
		return this.questions;
	}
	getQuestionsObject(testId:number,admin:boolean,getScores:boolean){
		var up:string=(admin) ? '../' : '';
		return this.http.post(`${up}api/public/question/${testId}/getQuestions`,{getScores:getScores})
		.toPromise()
		.then(response => {
			let json = response.json();
			let questionsObject = [];
			let questions = [];
			for (let responseQuestion of json.questions) {
				let question:Question = {
					id: responseQuestion.id,
					text : responseQuestion.text,
					images : responseQuestion.images,
					type : responseQuestion.type,
					answers : responseQuestion.answers
				};
				questions.push(question);
			}
			questionsObject['questions'] = questions;
			questionsObject['pageQuestionNumber'] = json.pageQuestionNumber;
			questionsObject['pageTime'] = json.pageTime;

			return questionsObject;
		})
	}
	setQuestions(questions:Question[]){
		this.questions=questions;
	}
	changeAnswer(questionId:number,answerId:number){
		for(let question of this.questions){
			if(question.id === questionId){
				for(let answer of question.answers){
					if(answer.id === answerId){
						if(question.type === "checkbox"){
							answer.marked=(answer.marked) ? false : true;
						}else if(question.type === "radio"){
							question.answers=question.answers.map(function(answer){
								answer.marked=false;
								return answer;
							})
							answer.marked=true;
						}
					}
				}
			}
		}
	}

	addQuestion(testId:number) {
		return this.jwtService.post('../api/public/question/addQuestion', {testId: testId})
			.toPromise()
			.then(response => {
				let json = response.json();
				let question:Question = {
					id : json.id,
					text : json.text,
					type : json.type,
					images : [],
				}
				return question;
			})
	}

	getQuestionById(id:number,questions:Question[]){
		for(let question of questions){
			if(question.id == id){
				return question;
			}
		}
	}

	getQuestionIndexById(id:number, questions:Question[]) {
		return questions.findIndex(function (question) {
			if (question.id == id) {
				return true;
			}
		})
	}

	deleteQuestion(id:number){
		this.jwtService.post('../api/public/question/deleteQuestion', {id: id})
			.toPromise();
	}
	
	saveAnswers(fillId:number, questions:Question[]) {
		this.http.post('api/public/answer/saveAnswers', {fillId:fillId, questions:questions})
			.toPromise()
	}
}