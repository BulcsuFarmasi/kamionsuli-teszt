import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableGroupTypeSelectComponent } from './editable-group-type-select.component';

describe('EditableGroupTypeSelectComponent', () => {
  let component: EditableGroupTypeSelectComponent;
  let fixture: ComponentFixture<EditableGroupTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableGroupTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableGroupTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
