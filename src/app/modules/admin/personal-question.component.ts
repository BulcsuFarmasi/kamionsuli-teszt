import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Edited } from '../services/edited';
import { PersonalQuestion, PersonalType, PersonalDataService } from '../services/personal-data.service';

@Component({
	selector:'personal-question',
	templateUrl:'templates/personal-question.component.html'
})

export class PersonalQuestionComponent{
	@Input() personalQuestion:PersonalQuestion;
	@Output() onTransferEditing:EventEmitter<Edited>= new EventEmitter();
	@Input() personalTypes:PersonalType[];

	constructor(private personalDataService:PersonalDataService){}

	onStopEditing(edited:Edited){
		this.onTransferEditing.emit(edited);
	}

	getPersonalType(id:number){
		this.personalQuestion.type.name=this.personalDataService.getTypeNameById(id);
		let edited=new Edited();
		edited.id=this.personalQuestion.id;
		edited.value=this.personalQuestion.type;
		edited.type='personalQuestionType';
		this.onStopEditing(edited);
	}

}