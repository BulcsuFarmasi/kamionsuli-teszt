import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditableInputComponent } from '../../../editable/components/editable-input/editable-input.component';
import { EditableDateComponent } from '../../../editable/components/editable-date.component.ts/editable-date.component';
import { ImagesComponent } from '../images/images.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from '../question/question.component';
import { JwtService } from '../../../../../../services/jwt.service';
import { NetworkService } from '../../../../../../services/network.service';
import { QuestionService } from '../../../../../../services/question.service';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [  EditableInputComponent, 
                      EditableDateComponent,
                      ImagesComponent,
                      ImageUploadComponent, 
                      QuestionComponent,
                      QuestionsComponent
                     ]
      providers: [ NetworkService, JwtService, QuestionService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
