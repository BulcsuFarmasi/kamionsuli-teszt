import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { from } from 'rxjs';

import { GroupsComponent } from './groups.component';
import { GroupService } from '../../../../../../services/group.service';
import { Group } from '../../../../../../models/group';
import { NetworkService } from '../../../../../../services/network.service';
import { JwtService } from '../../../../../../services/jwt.service';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;
  let service: GroupService;
  let group:Group;
  let datePipe:DatePipe

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ GroupService, NetworkService, JwtService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    datePipe = new DatePipe('en-US');
  });

  beforeEach(() => {
    service = TestBed.get(GroupService);
    
    group = {id: 1, name: 'GKI1', accessFrom: new Date(), accessTo: new Date(), type: { id: 1, name: 'GKI' } }

    spyOn(service, 'getGroups').and.returnValue(from([[group]]));

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display group id', () => {
    let debugElement = fixture.debugElement.query(By.css('.group-id'));
    let element:HTMLElement = debugElement.nativeElement;

    expect(element.textContent).toBe(group.id.toString());
  })
  it('should display group name', () => {
    let debugElement = fixture.debugElement.query(By.css('.group-name'));
    let element:HTMLElement = debugElement.nativeElement;

    expect(element.textContent).toBe(group.name);
  })
  it('should display group access from', () => {
    let debugElement = fixture.debugElement.query(By.css('.group-access-from'));
    let element:HTMLElement = debugElement.nativeElement;

    expect(element.textContent).toBe(datePipe.transform(group.accessFrom, 'y.MM.dd'));
  })
  it('should display group access to', () => {
    let debugElement = fixture.debugElement.query(By.css('.group-access-to'));
    let element:HTMLElement = debugElement.nativeElement;

    expect(element.textContent).toBe(datePipe.transform(group.accessTo, 'y.MM.dd'));
  })
  it('should display group type name', () => {
    let debugElement = fixture.debugElement.query(By.css('.group-type-name'));
    let element:HTMLElement = debugElement.nativeElement;

    expect(element.textContent).toBe(group.type.name);
  })

  it('should have a link to see the users', () => {
    let debugElement = fixture.debugElement.query(By.css('.users'));

    expect(debugElement.properties.href).toBe('/admin/users/' + group.id );
  })

  it('should have a link to edit the group', () => {
    let debugElement = fixture.debugElement.query(By.css('.edit-group'));
    expect(debugElement.properties.href).toBe('/admin/group/edit/' + group.id);
  })

  it('should have a add group button', () => {
    let debugElement = fixture.debugElement.query(By.css('button.add-group'));
    expect(debugElement).toBeTruthy();
  })
});