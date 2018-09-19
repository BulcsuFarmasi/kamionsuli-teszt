import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy  {

    authenticateSubscription:Subscription;
    roleIdSubscription:Subscription;
    getRoleSubscription:Subscription;
    badCreditentals:boolean;
    errorMessage:string;
    roleId:number
    constructor(private userService:UserService, private router:Router, private route:ActivatedRoute){}

    ngOnInit () {
       this.roleIdSubscription = this.route.paramMap.subscribe(params => {
          this.roleId = +params.get('roleId')
        })
    }

    ngOnDestroy () {
      this.authenticateSubscription.unsubscribe();
      this.roleIdSubscription.unsubscribe();
      this.getRoleSubscription.unsubscribe();
    }
  
    submit (form) {
      let creditentals = {
        ...form.value,
        roleId: this.roleId
      }
      this.authenticateSubscription = this.userService.authenticate(creditentals).subscribe(
        (response:any) => {
            if (response.errorCode) {
              this.badCreditentals = true;
              this.errorMessage = response.errorMessage;
            } else {
               this.getRoleSubscription = this.getRoute().subscribe((route) => {
                  if (route) {
                    this.router.navigate([route]);
                  }
                })
            }
        }
      )
    }

    private getUser () {
      return this.userService.getUser();
    }

    private getRoute () {
     return this.getUser().pipe(
          map(user => {
            console.log(user);
            if (user.role) {
              let route;
              switch (user.role.id) {
                case 1:
                  route = '/admin';break;
                case 2:
                  route = '/';break;
              }
              return route;
            }
          })
        )
    }

  }
