import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { PageComponent } from '../page/page.component';
import { ResultQuestionComponent } from '../result-question/result-question.component';
import { QuestionComponent } from '../question/question.component';
import { QuestionsComponent } from '../questions/questions.component';
import { StartComponent } from '../start/start.component';
import { TestComponent } from './test.component';
import { TimerComponent } from '../timer/timer.component';
import { ValuationComponent } from '../valuation/valuation.component';
import { WrongQuestionsComponent } from '../wrong-questions/wrong-questions.component';
import { FillService } from 'src/app/services/fill.service';
import { JwtService } from 'src/app/services/jwt.service';
import { NetworkService } from 'src/app/services/network.service';
import { TestService } from 'src/app/services/test.service';
import { TimeService } from 'src/app/services/time.service';
import { UserService } from 'src/app/services/user.service';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ PageComponent, ResultQuestionComponent, QuestionComponent, QuestionsComponent,  StartComponent, TestComponent, TimerComponent, ValuationComponent, WrongQuestionsComponent ],
      providers: [ FillService, JwtService, NetworkService, TestService, TimeService, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display wrongQuestions is currentState is wrong questions', () => {
      component.currentState = 'wrong questions';

      let debugElement = fixture.debugElement.query(By.css('wrong-questions'));

      expect(debugElement).toBeTruthy();
  })

  it('should NOT display wrongQuestions is currentState is NOT wrong questions', () => {

    let debugElement = fixture.debugElement.query(By.css('wrong-questions'));

    expect(debugElement).toBeFalsy();
})
});