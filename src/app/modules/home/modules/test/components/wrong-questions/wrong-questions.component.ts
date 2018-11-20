import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'wrong-questions',
  templateUrl: './wrong-questions.component.html',
  styleUrls: ['./wrong-questions.component.scss']
})
export class WrongQuestionsComponent implements OnInit {

  questions:Question[];
  
  constructor(private testService:TestService) { }

  ngOnInit() {
    this.questions = this.testService.test.questions;
  }

}
