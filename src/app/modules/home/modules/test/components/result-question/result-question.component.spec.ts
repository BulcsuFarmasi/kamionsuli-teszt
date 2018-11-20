import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultQuestionComponent } from './result-question.component';
import { By } from '@angular/platform-browser';

describe('ResultQuestionComponent', () => {
  let component: ResultQuestionComponent;
  let fixture: ComponentFixture<ResultQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultQuestionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display wrong if answered correctly is false', () => {
      component.question = {
          id: 1,
          text: '',
          type: '',
          images: [],
          answeredCorrectly: false
      }
      const debugElement = fixture.debugElement.query(By.css('.wrong'));

      expect(debugElement).toBeTruthy();
  })

  it('should display right if answered correctly is true', () => {
    component.question = {
        id: 1,
        text: '',
        type: '',
        images: [],
        answeredCorrectly: false
    }
    const debugElement = fixture.debugElement.query(By.css('.wrong'));

    expect(debugElement).toBeTruthy();
})
});