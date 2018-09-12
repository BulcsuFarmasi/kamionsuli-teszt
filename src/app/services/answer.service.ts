import { Injectable } from '@angular/core'
import { JwtService } from './jwt.service';
import { Answer } from '../models/answer';

@Injectable()
export class AnswerService {
    constructor(private jwtService:JwtService){}

    addAnswer(questionId:number) {
       /*return this.jwtService.post('../api/public/answer/addAnswer',{questionId: questionId})
           .toPromise()
           .then(response => {
               let json = response.json();
               let answer:Answer = {
                    id: json.id,
                    text: json.text,
                    score: json.score
               }
               return answer;
           })*/
    }

    getAnswerIndexById(id:number, answers:Answer[]) {
      return answers.findIndex(function (answer) {
          if (answer.id == id) {
              return true;
          }
      })
    }

    deleteAnswer(id: number) {
        this.jwtService.post('../api/public/answer/deleteAnswer', {id: id}).toPromise();
    }
}
