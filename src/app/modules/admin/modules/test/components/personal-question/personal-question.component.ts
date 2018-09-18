import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Edited } from '../../../../../../models/edited';
import { PersonalQuestion } from '../../../../../../models/personal-question';
import { PersonalType } from '../../../../../../models/personal-type';
import { PersonalDataService } from '../../../../../../services/personal-data.service';

@Component({
	selector:'personal-question',
	templateUrl:'./personal-question.component.html',
	encapsulation: ViewEncapsulation.None
})

export class PersonalQuestionComponent implements OnDestroy {
	@Input() personalQuestion:PersonalQuestion;
	@Output() onTransferEditing:EventEmitter<Edited>= new EventEmitter();
	@Input() personalTypes:PersonalType[];

	private saveNameSubscription:Subscription;
	private saveTypeSubscription:Subscription;

	constructor(private personalDataService:PersonalDataService){}

	ngOnDestroy () {
		this.saveNameSubscription.unsubscribe();
		this.saveTypeSubscription.unsubscribe();
	}

	saveName(name:string){
		this.personalQuestion.name=name;
		this.saveNameSubscription = this.personalDataService.savePersonalQuestionName(this.personalQuestion.id,name).subscribe();
	}

	saveType(typeId:number){
		this.personalDataService.savePersonalQuestionType(this.personalQuestion.id,typeId);
	}

}