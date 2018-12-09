import { Injectable } from '@angular/core';


import { map } from 'rxjs/operators';


import { Question } from '../models/question';

import { NetworkService } from './network.service';

@Injectable()
export class QuestionService{
	private questions:Question[];
	constructor(private networkService:NetworkService){};
	getQuestions(){
		return this.questions;
	}

	findAnsweredCorrectly (questions:Question[]):Question[] {
		return questions.map((question) => {
			question.answeredCorrectly = false;
			question.answers.forEach((answer) => {
				if (answer.correct && answer.marked) {
					question.answeredCorrectly = true;
				}
			})
			return question;
		})
	} 

	getQuestionsObject(testId:number,getCorrects:boolean) {
		return this.networkService.get(`question/${testId}/getQuestions/${getCorrects}`)
		.pipe(
			map((response:any) => {
			let questionsObject = [];
			let questions = [];
			for (let responseQuestion of response.questions) {
				let question:Question = {
					id: responseQuestion.id,
					text : responseQuestion.text,
					images : responseQuestion.images,
					answers : responseQuestion.answers
				};
				questions.push(question);
			}
			questionsObject['questions'] = questions;
			questionsObject['pageQuestionNumber'] = response.pageQuestionNumber;
			questionsObject['time'] = response.time.substring(3)

			return questionsObject;
			})

		)
	}
	setQuestions(questions:Question[]){
		this.questions=questions;
	}
	changeAnswer(questionId:number,answerId:number){
		for(let question of this.questions){
			if(question.id === questionId){
				for(let answer of question.answers){
					if(answer.id === answerId){
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

	addQuestion(testId:number) {
		return this.networkService.post('../api/public/question/addQuestion', {testId: testId})
			.pipe(
				map((question:Question) =>  {
					question.images = [];
					return question;
				})
			)
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
		return this.networkService.delete('question/' + id)
	}

	// Fisher-Yates
	
	randomizeQuestions (questions:Question[]):Question[] {
		let randomizedQuestions:Question[] = [];

		for (let i = questions.length - 1; i >= 0; i--) {
			let randomIndex = Math.floor(Math.random() * i);
			randomizedQuestions.push(questions[randomIndex]);
			questions.splice(randomIndex, 1);
		}
		
		return randomizedQuestions;
	}

	saveText(id:number, text:string){
		return this.networkService.patch('question/saveText',{id:id,text:text})
	}

}