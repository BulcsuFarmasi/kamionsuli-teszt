import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { User } from '../../../../models/user';

import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBarComponent implements OnInit {

  user:User;
  userSubscription:Subscription;  
  
  constructor(private userService:UserService, private router:Router) {}

  ngOnInit () {
    this.userSubscription = this.userService.getUserSubject()
                            .subscribe(user => {this.user = user;console.log(user)});
  }
  
  ngOnDestroy () {
    this.userSubscription.unsubscribe();
  }

  logOut () {
    this.userService.logOut();

    let route;
    switch(this.user.role.id) {
      case 1:
        route = '/admin/user/log-in/1'; break;
      case 2:
        route = '/user/log-in/2'; break;
    }
    this.router.navigate([route]) 
  }

}
