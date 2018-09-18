import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnDestroy  {

    subscription:Subscription;
    badCreditentals:boolean;
    errorMessage:string
    constructor(private userService:UserService, private router:Router){}
  
    submit (form) {
      let creditentals = {
        ...form.value,
        roleId: 2
      }
      this.subscription = this.userService.authenticate(creditentals).subscribe(
        (response:any) => {
            if (response.errorCode) {
              this.badCreditentals = true;
              this.errorMessage = response.errorMessage;
            } else {
                this.router.navigate(['/']);
            }
        }
      )
    }

    ngOnDestroy () {
      this.subscription.unsubscribe();
    }
}
