import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LogInComponent } from './log-in.component';
import { JwtService } from '../../../../services/jwt.service';
import { NetworkService } from '../../../../services/network.service';
import { UserService } from '../../../../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ LogInComponent ],
      providers: [ JwtService, NetworkService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a password reset link', () => {
    const debugElement = fixture.debugElement.query(By.css('.reset-password'));

    expect(debugElement.attributes.routerLink).toBe('/user/send-reset-password');
  })
});
