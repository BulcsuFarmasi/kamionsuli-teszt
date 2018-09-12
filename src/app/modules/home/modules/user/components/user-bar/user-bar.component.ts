import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { User } from '../../../../../../models/user';

import { UserService } from '../../../../../../services/user.service';


@Component({
  selector: 'user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent implements OnInit {

  user:User;
  userSubscription:Subscription;  
  
  constructor(private userService:UserService, private router:Router) {}

  ngOnInit () {
    this.userSubscription = this.userService.getUser()
                            .subscribe(user => {this.user = user});
  }
  
  ngOnDestroy () {
    this.userSubscription.unsubscribe();
  }

  logOut () {
    this.userService.logOut();
    this.router.navigate(['/user/log-in']) 
  }

}
