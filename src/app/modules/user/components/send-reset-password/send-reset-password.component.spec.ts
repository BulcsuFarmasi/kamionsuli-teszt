import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SendResetPasswordComponent } from './send-reset-password.component';
import { JwtService } from '../../../../services/jwt.service';
import { NetworkService } from '../../../../services/network.service';
import { UserService } from '../../../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SendResetPasswordComponent', () => {
  let component: SendResetPasswordComponent;
  let fixture: ComponentFixture<SendResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ SendResetPasswordComponent ],
      providers: [ JwtService, NetworkService, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an e-mail field', () => {
    const debugElement = fixture.debugElement.query(By.css('#email'));

    expect(debugElement).toBeTruthy();
  })
  it('should have a submit button', () => {
    const debugElement = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(debugElement).toBeTruthy();
  })
  it('should display sended message after submitting the form', () => {
    const form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('ngSubmit',new NgForm([],[]));
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.sended'));

    expect(debugElement).toBeTruthy();
  })
  it('should display e-mail address in the sended message', fakeAsync(() => {
    const form = fixture.debugElement.query(By.css('form'));

    sendEmail('a@a.hu').then(() => {
      form.triggerEventHandler('ngSubmit',new NgForm([],[]));
      fixture.detectChanges();

      const debugElement = fixture.debugElement.query(By.css('.email-display'));
      const element:HTMLElement = debugElement.nativeElement;


      expect(element.innerText).toBe(component.email);
    })
    
  }))

  function sendEmail (email:string) {
    const emailField:HTMLInputElement = fixture.nativeElement.querySelector('#email');
    emailField.value = email;
    emailField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }
});
