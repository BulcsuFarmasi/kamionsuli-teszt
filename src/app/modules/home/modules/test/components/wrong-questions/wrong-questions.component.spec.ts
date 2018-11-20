import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongQuestionsComponent } from './wrong-questions.component';

describe('WrongQuestionsComponent', () => {
  let component: WrongQuestionsComponent;
  let fixture: ComponentFixture<WrongQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
