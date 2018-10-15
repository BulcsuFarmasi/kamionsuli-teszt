import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-send-reset-password',
  templateUrl: './send-reset-password.component.html',
  styleUrls: ['./send-reset-password.component.scss']
})
export class SendResetPasswordComponent implements OnInit, OnDestroy {

  isSended:boolean = false;
  email:string = '';
  sendResetPasswordSubscribtion:Subscription;
  
  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  ngOnDestroy () {
    if (this.sendResetPasswordSubscribtion) {
      this.sendResetPasswordSubscribtion.unsubscribe();
    }
  }

  submit (form:NgForm) {
    if (!this.isSended) {
      this.isSended = true;
      this.email = form.value.email;
      this.userService.sendResetPassword(this.email).subscribe(() => {});
      form.reset();
    }
  }

}
