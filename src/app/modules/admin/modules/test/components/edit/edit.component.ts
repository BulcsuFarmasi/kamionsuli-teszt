import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { PersonalDataService, PersonalType } from '../services/personal-data.service';
import { TestService, Test } from '../services/test.service';
import { QuestionService } from '../services/question.service';
import { ImageService } from '../services/image.service';
import { Image } from '../services/image';
import { AnswerService } from '../services/answer.service';

@Component({
	templateUrl:'./edit.component.html',
	styleUrls: ['./edit.component.scss'],
    providers:[QuestionService,PersonalDataService,ImageService,AnswerService]
})
export class EditComponent implements OnInit{
	public test:Test;
	public personalTypes:PersonalType[];
	constructor(private testService:TestService, private router:Router, private route:ActivatedRoute,
				private questionService:QuestionService, private personalDataService:PersonalDataService,
				private imageService:ImageService){}

	ngOnInit(){
		this.test = {
			id: this.route.snapshot.paramMap.get('id')
		} 

		this.testService.setId(this.test.id);
		this.testService.getStartData(true).then(test => this.test=test);
		this.questionService.getQuestionsObject(this.testService.getId(),true,true).then(questions => {
			this.test.questions=questions['questions'];
			this.test.pageQuestionNumber=questions['pageQuestionNumber']
			this.test.pageTime = questions['pageTime'].substring(3);
			this.personalDataService.getPersonalData(this.testService.getId(),true).then(personalQuestions => {
				this.test.personalQuestions=personalQuestions;
				this.personalDataService.getPersonalTypes().then(personalTypes => {
					this.personalTypes=personalTypes;
				});
			})
		});

	}

	onStopEditing(edited){
		console.log(edited);
		switch(edited.type){
			case 'testName':
				this.saveTestName(edited.value);break;
			case 'testPageQuestionNumber':
				this.savePageQuestionNumber(edited.value);break;
			case 'testPageTime':
				this.savePageTime(edited.value);break;
			case 'startTime':
				this.saveStartTime(edited.value);break;
			case 'endTime':
				this.saveEndTime(edited.value);break;
			case 'questionText':
				this.saveQuestionText(edited.id,edited.value);break;
			case 'questionType':
				this.saveQuestionType(edited.id,edited.value);break;
			case 'answerText':
				this.saveAnswerText(edited.id,edited.value);break;
			case 'answerScore':
				this.saveAnswerScore(edited.id,edited.value);break;
			case 'personalQuestionName':
				this.savePersonalQuestionName(edited.id,edited.value);break;
			case 'personalQuestionType':
				this.savePersonalQuestionType(edited.id,edited.value);break;
			case 'image':
				this.saveImage(edited.id,edited.value);break;
			case 'deleteImage':
				this.deleteImage(edited.id);break;
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

	savePageTime (pageTime:string){
		this.testService.setPageTime(pageTime);
		this.testService.savePageTime();
	}

	saveStartTime (startTime){
		console.log(startTime)
		this.testService.setStartTime(startTime);
		this.testService.saveStartTime();
	}

	saveEndTime (endTime){
		console.log(endTime)
		this.testService.setEndTime(endTime);
		this.testService.saveEndTime();
	}

	saveQuestionText(id:number,text:string){
		this.questionService.getQuestionById(id,this.test.questions).text=text;
		this.testService.saveQuestionText(id,text);
	}

	saveQuestionType(id:number,type:string){
		this.questionService.getQuestionById(id,this.test.questions).type=type;
		this.testService.saveQuestionType(id,type);
	}

	saveAnswerText(id:number,text:string){
		this.testService.getAnswerById(id,this.test.questions).text=text;
		this.testService.saveAnswerText(id,text);
	}

	saveAnswerScore(id:number,score:number){
		this.testService.getAnswerById(id,this.test.questions).score=score;
		this.testService.saveAnswerScore(id,score);
	}

	savePersonalQuestionName(id:number,name:string){
		this.testService.getPersonalQuestionById(id,this.test.personalQuestions).name=name;
		this.testService.savePersonalQuestionName(id,name);
	}

	savePersonalQuestionType(id:number,type:PersonalType){
		this.testService.getPersonalQuestionById(id,this.test.personalQuestions).type=type;
		this.testService.savePersonalQuestionType(id,type.id);
	}

	saveImage(id:number,image:Image){
		this.imageService.saveImage(id,image)
			.then(image => {
				image.path='../../' + image.path;
				this.questionService.getQuestionById(id,this.test.questions).images.push(image);
			});
	}


	deleteImage(id){
		if(confirm('Biztos törölni akarod a képet?')) {
			this.imageService.deleteImage(id);
			outer:
				for (var question of this.test.questions) {
					for (var i = 0; i < question.images.length; i++) {
						if (id === question.images[i].id) {
							question.images.splice(i, 1);
							break outer;
						}
					}
				}
		}
	}

	addQuestion() {
		this.questionService.addQuestion(this.test.id).then(question => {
			this.test.questions.push(question);
			console.log(this.test.questions);
		})
	}

	deleteQuestion(questionId) {
		if(confirm('Biztos törölni akarod a kérdést?')) {
			let questionIndex = this.questionService.getQuestionIndexById(questionId, this.test.questions)
			this.test.questions.splice(questionIndex, 1);
			this.questionService.deleteQuestion(questionId);
		}
	}

	addPersonalQuestion () {
		this.personalDataService.addPersonalQuestion(this.test.id).then();
	}

	deletePersonalQuestion (personalQuestionId) {
		if(confirm('Biztos törölni akarod a személyes kérdést?')) {
			let personalQuestionIndex = this.personalDataService.getPersonalQuestionIndexById(personalQuestionId, this.test.personalQuestions);
			this.test.personalQuestions.splice(personalQuestionIndex, 1);
			this.personalDataService.deletePersonalQuestion(personalQuestionId);
		}
	}
	
}