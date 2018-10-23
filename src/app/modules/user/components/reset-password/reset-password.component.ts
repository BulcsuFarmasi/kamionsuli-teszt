import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Subscription, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { User } from "../../../../models/user";
import { UserService } from "../../../../services/user.service";
import { PasswordValidators } from "./password.validators";

@Component({
  selector: "reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  codeNotValid: boolean;
  form: AbstractControl;
  gotUser: boolean;
  passwordRetrieverCode: string;
  passwordRetrieverCodeSubscription: Subscription;
  success: boolean;
  user: User;
  userNotFound: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.passwordRetrieverCodeSubscription = this.route.params
      .pipe(
        switchMap(params => {
          if (params.passwordRetrieverCode) {
            this.passwordRetrieverCode = params.passwordRetrieverCode;
            if (this.passwordRetrieverCode.length !== 30) {
              this.codeNotValid = true;
              let user: User = {};
              return of({ user });
            } else {
              return this.userService.getByPasswordRetrieverCode(
                this.passwordRetrieverCode
              );
            }
          } else {
            return this.userService.getUserSubject();
          }
        })
      )
      .subscribe((user: User) => {
        if (user.id) {
          this.user = user;
          this.constructForm();
        } else if (user.notFound) {
          this.userNotFound = true;
        }
        this.gotUser = true;
      });
  }

  ngOnDestroy() {
    this.passwordRetrieverCodeSubscription.unsubscribe();
  }

  constructForm() {
    this.form = this.formBuilder.group(
      {
        password: ["", Validators.required],
        password2: ["", Validators.required]
      },
      {
        validator: PasswordValidators.passwordsMatch
      }
    );
  }

  get password() {
    return this.form.get("password");
  }

  get password2() {
    return this.form.get("password2");
  }

  resetPassword() {
    this.userService
      .resetPassword(this.user.id, this.password.value)
      .subscribe(() => {
        this.success = true;
      });
  }
}
