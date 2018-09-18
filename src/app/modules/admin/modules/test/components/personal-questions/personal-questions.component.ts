import { Component, OnInit, Input } from '@angular/core';


import { Subscription } from 'rxjs';


import { PersonalQuestion } from '../../../../../../models/personal-question';

import { PersonalDataService } from '../../../../../../services/personal-data.service';

@Component({
  selector: 'personal-questions',
  templateUrl: './personal-questions.component.html',
  styleUrls: ['./personal-questions.component.scss']
})
export class PersonalQuestionsComponent implements OnInit {

  @Input('personalQuestions') personalQuestions:PersonalQuestion[];
  @Input('testId') testId:number;

  private addPersonalQuestionSubscription:Subscription;
  private deletePersonalQuestionSubscription:Subscription;
  
  constructor(private personalDataService:PersonalDataService) { }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.addPersonalQuestionSubscription.unsubscribe();
    this.deletePersonalQuestionSubscription.unsubscribe();
  }

  addPersonalQuestion () {
    this.personalDataService.addPersonalQuestion(this.testId)
    .subscribe((personalQuestion:PersonalQuestion) => {
      this.personalQuestions.push(personalQuestion);
    });
	}

	deletePersonalQuestion (personalQuestionId) {
		if(confirm('Biztos törölni akarod a személyes kérdést?')) {
			let personalQuestionIndex = this.personalDataService.getPersonalQuestionIndexById(personalQuestionId, this.personalQuestions);
			this.personalQuestions.splice(personalQuestionIndex, 1);
			this.personalDataService.deletePersonalQuestion(personalQuestionId).subscribe();
		}
  }


}
