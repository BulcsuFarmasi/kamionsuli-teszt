import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetPasswordComponentComponent } from './send-reset-password-component.component';

describe('SendResetPasswordComponentComponent', () => {
  let component: SendResetPasswordComponentComponent;
  let fixture: ComponentFixture<SendResetPasswordComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendResetPasswordComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResetPasswordComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
