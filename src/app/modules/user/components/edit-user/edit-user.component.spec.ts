import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EditUserComponent } from './edit-user.component';
import { EditableInputComponent } from '../../../admin/modules/editable/components/editable-input/editable-input.component';
import { EditableDateComponent } from '../../../admin/modules/editable/components/editable-date.component.ts/editable-date.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NetworkService } from '../../../../services/network.service';
import { JwtService } from '../../../../services/jwt.service';
import { UserService } from '../../../../services/user.service';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ EditUserComponent, EditableInputComponent, EditableDateComponent ],
      providers: [ NetworkService, JwtService, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
