import { Component, Input, ViewEncapsulation } from '@angular/core';

import { QuestionService, Question } from '../../../../services/question.service';


@Component({
	selector:'question',
	templateUrl:'./question.component.html',
	styleUrls:['./question.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class QuestionComponent{
	@Input() question:Question
	constructor(private questionService:QuestionService){};
	changeAnswer(questionId,answerId){
		this.questionService.changeAnswer(questionId,answerId);
	}
};