import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'wrong-question',
  templateUrl: './wrong-question.component.html',
  styleUrls: ['./wrong-question.component.scss'],
  encapsulation: ViewEncapsulation.None;
})
export class WrongQuestionComponent implements OnInit {

  @Input('index')  index:string;
  @Input('question') question:Question
  
  constructor() { }

  ngOnInit() {
  }

}
