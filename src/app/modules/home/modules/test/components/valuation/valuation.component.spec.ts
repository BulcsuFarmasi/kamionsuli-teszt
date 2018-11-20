import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { ResultQuestionComponent } from '../result-question/result-question.component';
import { ValuationComponent } from './valuation.component';
import { FillService } from 'src/app/services/fill.service';
import { JwtService } from 'src/app/services/jwt.service';
import { NetworkService } from 'src/app/services/network.service';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';

describe('ValuationComponent', () => {
  let component: ValuationComponent;
  let fixture: ComponentFixture<ValuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],  
      declarations: [ ResultQuestionComponent, ValuationComponent ],
      providers: [ FillService, JwtService, NetworkService, QuestionService, TestService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a go to wrong answers button', () => {
    component.valued = true;
    const debugElement = fixture.debugElement.query(By.css('.go-to-wrong-answers'))

    expect(debugElement).toBeTruthy();
  })
});