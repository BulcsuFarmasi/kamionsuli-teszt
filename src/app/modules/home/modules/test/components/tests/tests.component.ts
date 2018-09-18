import { Component, OnInit } from '@angular/core';
import { Test } from '../../../../../../models/test';


import { Observable } from 'rxjs';


import { TestService } from '../../../../../../services/test.service';

@Component({
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests:Observable<Test[]>
  constructor(private testService:TestService) { }

  ngOnInit() {
      this.tests = this.testService.getTests(false);
  }

}
