import { Pipe, PipeTransform } from '@angular/core';
import { Question } from 'src/app/models/question';

@Pipe({
  name: 'wrongQuestions'
})
export class WrongQuestionsPipe implements PipeTransform {

  transform(questions: Question[], args?: any): any {
    return questions.filter(question => !question.answeredCorrectly);
  }

}
