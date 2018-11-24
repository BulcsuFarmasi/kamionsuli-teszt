import { Component, OnInit, Input } from '@angular/core';
import { Test } from '../../../../../../models/test';


import { Observable } from 'rxjs';


import { TestService } from '../../../../../../services/test.service';
import { UserService } from 'src/app/services/user.service';
import { EditableInputComponent } from 'src/app/modules/admin/modules/editable/components/editable-input/editable-input.component';

@Component({
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests:Observable<Test[]>;
  @Input('groupTypeId') groupTypeId:number;
  constructor(private testService:TestService, private userService:UserService) { }

  ngOnInit() {
      this.tests = this.testService.getTests(false, this.groupTypeId);
  }

}
