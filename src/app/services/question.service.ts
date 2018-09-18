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
	getQuestionsObject(testId:number,getScores:boolean) {
		return this.networkService.get(`question/${testId}/getQuestions/${getScores}`)
		.pipe(
			map((response:any) => {
			let questionsObject = [];
			let questions = [];
			for (let responseQuestion of response.questions) {
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
			questionsObject['pageQuestionNumber'] = response.pageQuestionNumber;
			questionsObject['pageTime'] = response.pageTime;

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

	saveText(id:number, text:string){
		return this.networkService.patch('question/saveText',{id:id,text:text})
	}

	saveType(id:number, type:string){
		return this.networkService.patch('question/saveType',{id:id,type:type})
	}
}