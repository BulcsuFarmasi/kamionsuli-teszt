import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileComponent } from "./profile.component";
import { UserService } from "../../../../services/user.service";
import { NetworkService } from "../../../../services/network.service";
import { JwtService } from "../../../../services/jwt.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProfileComponent],
      providers: [UserService, NetworkService, JwtService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a link for changing password", () => {
    const debugElements = fixture.debugElement.queryAll(By.css("a"));

    const index = debugElements.findIndex(
      debugElement =>
        debugElement.attributes["routerLink"] === "/user/reset-password"
    );

    expect(index).toBeGreaterThan(-1);
  });
});
