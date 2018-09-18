import { Component, OnInit, Input, OnDestroy } from '@angular/core';


import { Subscription } from 'rxjs';


import { Question } from '../../../../../../models/question';
import { QuestionService } from '../../../../../../services/question.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  @Input('questions') questions:Question[];
  @Input('testId') testId:number;

  private addQuestionSubscription:Subscription;
  private deleteQuestionSubscription:Subscription;
  
  constructor (private questionService:QuestionService) { }

  ngOnInit () {
  }

  ngOnDestroy () {
    this.addQuestionSubscription.unsubscribe();
    this.deleteQuestionSubscription.unsubscribe();
  }

  addQuestion() {
		this.addQuestionSubscription = this.questionService.addQuestion(this.testId).subscribe(question => {
			this.questions.push(question);
		})
	}

	deleteQuestion(questionId) {
		if(confirm('Biztos törölni akarod a kérdést?')) {
			let questionIndex = this.questionService.getQuestionIndexById(questionId, this.questions)
			this.questions.splice(questionIndex, 1);
			this.deleteQuestionSubscription = this.questionService.deleteQuestion(questionId).subscribe(() => {});
		}
	}

}
