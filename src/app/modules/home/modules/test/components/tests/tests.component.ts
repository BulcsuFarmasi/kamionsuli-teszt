import { Component, OnInit } from '@angular/core';
import { Test } from '../../../../../../models/test';
import { Observable } from 'rxjs';
import { JwtService } from '../../../../../../services/jwt.service';

@Component({
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests:Observable<Test[]>
  constructor(private jwtService:JwtService) { }

  ngOnInit() {
      this.tests = <Observable<Test[]>> this.jwtService.post('test/getTests');
  }

}
