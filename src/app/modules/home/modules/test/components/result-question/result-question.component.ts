import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Question } from '../../../../../../models/question';

@Component({
	selector:'result-question',
	templateUrl:'./result-question.component.html',
	styleUrls:['result-question.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ResultQuestionComponent{
	@Input() question:Question;
};