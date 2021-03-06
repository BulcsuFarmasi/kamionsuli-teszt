import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';



import { Image } from '../../../../../../models/image'
import { Test} from '../../../../../../models/test'
 
import { TestService } from '../../../../../../services/test.service';
import { QuestionService } from '../../../../../../services/question.service';
import { ImageService } from '../../../../../../services/image.service';
import { AnswerService } from '../../../../../../services/answer.service';

@Component({
	templateUrl:'./edit.component.html',
	styleUrls: ['./edit.component.scss'],
    providers:[QuestionService,ImageService,AnswerService]
})
export class EditComponent implements OnInit, OnDestroy{
	test:Test;
	private getStartDataSubscription:Subscription;
	constructor(private testService:TestService, private router:Router, private route:ActivatedRoute,
				private questionService:QuestionService,
				private imageService:ImageService){}

	ngOnInit(){
		this.test = {
			id: +this.route.snapshot.paramMap.get('id')
		}
		
		console.log(this.test);

		this.testService.setId(this.test.id);
		this.getStartDataSubscription = this.testService.getStartData()
		.pipe(
			switchMap((test:Test) => {
				this.test = test
				return this.questionService.getQuestionsObject(this.test.id, true);
			})
		).subscribe(questions => {
			this.test.questions = questions['questions'];
			this.test.pageQuestionNumber = questions['pageQuestionNumber']
		})

	}

	ngOnDestroy () {
		this.getStartDataSubscription.unsubscribe();
	}

	onStopEditing(edited){
		switch(edited.type){
			case 'testName':
				this.saveTestName(edited.value);break;
			case 'testPageQuestionNumber':
				this.savePageQuestionNumber(edited.value);break;
		}
	}
	saveTestName(name:string){
		this.testService.setName(name);
		this.testService.saveName();
	}

	saveTestDescription(description:string){
		this.testService.setDescription(description);
		this.testService.saveDescription()
	}

	savePageQuestionNumber(pageQuestionNumber:number){
		this.testService.setPageQuestionNumber(pageQuestionNumber);
		this.testService.savePageQuestionNumber();
	}
	
}