import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { Edited } from '../../../../../../models/edited';
import { PersonalQuestion } from '../../../../../../models/personal-question';
import { PersonalType } from '../../../../../../models/personal-type';
import { PersonalDataService } from '../../../../../../services/personal-data.service';

@Component({
	selector:'personal-question',
	templateUrl:'./personal-question.component.html',
	encapsulation: ViewEncapsulation.None
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