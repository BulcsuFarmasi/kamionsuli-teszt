import { Injectable } from '@angular/core'


import { Answer } from '../models/answer';
import { Question } from '../models/question';

import { NetworkService } from './network.service';

@Injectable()
export class AnswerService {

    constructor(private networkService:NetworkService){}

    addAnswer(questionId:number) {
       return this.networkService.post('../api/public/answer/addAnswer',{questionId: questionId});
    }

    getAnswerIndexById(id:number, answers:Answer[]) {
      return answers.findIndex(function (answer) {
          if (answer.id == id) {
              return true;
          }
      })
    }

    deleteAnswer(id: number) {
       return this.networkService.delete('answer/' + id);
    }

    saveAnswers(fillId:number, questions:Question[]) {
		return this.networkService.put('answer/saveAnswers', {fillId:fillId, questions:questions})
	}

    saveText(id:number, text:string){
		return this.networkService.patch('answer/saveText',{id:id,text:text});
	}

	saveCorrect(id:number, correct:boolean){
		return this.networkService.patch('answer/saveCorrect',{id, correct});
	}
}
