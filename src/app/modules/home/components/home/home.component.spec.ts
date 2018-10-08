import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { UserBarComponent } from '../../../user/components/user-bar/user-bar.component';
import { UserService } from '../../../../services/user.service';
import { NetworkService } from '../../../../services/network.service';
import { JwtService } from '../../../../services/jwt.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ,RouterTestingModule.withRoutes([]) ],
      declarations: [ HomeComponent, UserBarComponent ],
      providers: [  NetworkService, UserService, JwtService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
