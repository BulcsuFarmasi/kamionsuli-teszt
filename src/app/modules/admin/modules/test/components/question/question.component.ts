import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';


import { Subscription } from 'rxjs';


import { Answer } from '../../../../../../models/answer';
import { Edited } from  '../../../../../../models/edited'
import { Question } from '../../../../../../models/question';

import { AnswerService } from "../../../../../../services/answer.service";
import { QuestionService } from '../../../../../../services/question.service';

@Component({
	selector:'question',
	templateUrl:'./question.component.html'
})

export class QuestionComponent implements OnDestroy {


	addAnswerSubscription:Subscription;
	deleteAnswerSubscription:Subscription;
	saveTextSubscription:Subscription;
	saveTypeSubscription:Subscription;
	saveAnswerTextSubscription:Subscription;
	saveAnswerCorrectSubscription:Subscription;
	@Input() question:Question;

	constructor(private answerService:AnswerService, private questionService:QuestionService){};

	ngOnDestroy () {
		this.addAnswerSubscription.unsubscribe();
		this.deleteAnswerSubscription.unsubscribe();
		this.saveTextSubscription.unsubscribe();
		this.saveTypeSubscription.unsubscribe();
		this.saveAnswerTextSubscription.unsubscribe();
		this.saveAnswerCorrectSubscription.unsubscribe();
	}

	addAnswer() {
		this.addAnswerSubscription = this.answerService.addAnswer(this.question.id)
			.subscribe((answer:Answer) => {
				this.question.answers.push(answer);
			})
	}
	deleteAnswer(answerId:number) {
    	if (confirm('Biztosan törlni akarod a választ?')) {
			let answerIndex = this.answerService.getAnswerIndexById(answerId, this.question.answers);
			this.question.answers.splice(answerIndex, 1);
			this.deleteAnswerSubscription = this.answerService.deleteAnswer(answerId).subscribe();
		}
	}

	saveText(text) {
		this.question.text = text;
		this.questionService.saveText(this.question.id, text).subscribe();
	}

	saveAnswerText(text:string, index:number){
		this.question.answers[index].text=text;
		this.answerService.saveText(this.question.answers[index].id, text).subscribe();
	}

	saveAnswerCorrect(correct:boolean, index:number){
		this.question.answers[index].correct=correct;
		this.answerService.saveCorrect(this.question.answers[index].id, correct).subscribe();
	}
}