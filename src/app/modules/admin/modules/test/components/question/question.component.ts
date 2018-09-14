import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Edited } from  '../services/edited'
import { Question } from '../services/question.service';
import { AnswerService } from "../services/answer.service";

@Component({
	selector:'question',
	templateUrl:'./question.component.html'
})

export class QuestionComponent{
	@Input() question:Question;
	@Output() onTransferEditing:EventEmitter<Edited> = new EventEmitter();

	constructor(private answerService:AnswerService){};

	onStopEditing(edited){
		this.onTransferEditing.emit(edited);
	}

	getFile(image){
		var edited=new Edited();
		edited.id=this.question.id;
		edited.type='image';
		edited.value=image;
		this.onStopEditing(edited);
    }

    deleteImage(imageId){
		var edited=new Edited();
		edited.id=imageId;
		edited.type='deleteImage';
		this.onStopEditing(edited);
	}

	addAnswer() {
		this.answerService.addAnswer(this.question.id)
			.then(answer => {
				this.question.answers.push(answer);
			})
	}
	deleteAnswer(answerId:number) {
    	if (confirm('Biztosan törlni akarod a választ?')) {
			let answerIndex = this.answerService.getAnswerIndexById(answerId, this.question.answers);
			this.question.answers.splice(answerIndex, 1);
			this.answerService.deleteAnswer(answerId);
		}
	}
}