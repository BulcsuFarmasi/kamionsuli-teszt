import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTypeSelectComponent } from './group-type-select.component';

describe('GroupTypeSelectComponent', () => {
  let component: GroupTypeSelectComponent;
  let fixture: ComponentFixture<GroupTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
