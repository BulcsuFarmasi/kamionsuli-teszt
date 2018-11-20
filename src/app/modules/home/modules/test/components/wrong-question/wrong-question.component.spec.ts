import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongQuestionComponent } from './wrong-question.component';

describe('WrongQuestionComponent', () => {
  let component: WrongQuestionComponent;
  let fixture: ComponentFixture<WrongQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
