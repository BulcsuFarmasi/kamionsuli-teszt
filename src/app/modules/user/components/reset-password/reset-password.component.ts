import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  codeNotValid:boolean;
  gotUser:boolean;
  passwordRetrieverCode:string;
  passwordRetrieverCodeSubscription:Subscription;
  user:User;
  
  constructor(private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit() {
    this.passwordRetrieverCodeSubscription = this.route.params
    .pipe(switchMap(params => {
      this.passwordRetrieverCode = params.passwordRetrieverCode;
      if (this.passwordRetrieverCode.length !== 30) {
        this.codeNotValid = true;
        this.gotUser = true;
        let user:User = {};
        return of({user});
      } else {
        return this.userService.getByPasswordRetrieverCode(this.passwordRetrieverCode)
      } 
    })).subscribe((user:User) => {
        if (user.id) {
          this.user = user;
        }
    });
    
  }

  ngOnDestroy () {
    this.passwordRetrieverCodeSubscription.unsubscribe();
  }

}
