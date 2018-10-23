import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

import { ResetPasswordComponent } from './reset-password.component';

class ActivatedRouteStub {
  private subject = new Subject();

  push (value) {
    this.subject.next(value)
  }

  get params () {
    return this.subject.asObservable();
  }
}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    
    let route:ActivatedRouteStub;
    
    beforeEach(() => {
      route = TestBed.get(ActivatedRoute);
    })
    

    it ('should set passwordRetrieverCode', () => {
      let passwordRetrieverCode = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      route.push({ passwordRetrieverCode })

      expect(component.passwordRetrieverCode).toBe(passwordRetrieverCode);
    })
    
    it ('should set codeNotValid is code is not valid', () => {
      let passwordRetrieverCode = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      route.push({ passwordRetrieverCode })

      expect(component.codeNotValid).toBeTruthy();
    })

    it ('should display code not valid message if codeNotValid is true', () => {
      component.codeNotValid = true;
      fixture.detectChanges();
      let debugElement = fixture.debugElement.query(By.css('.code-not-valid'));

      expect(debugElement).toBeTruthy();
    })

});
