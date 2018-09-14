import { Component, OnInit, OnDestroy } from '@angular/core';


import { Subscription } from 'rxjs';


import { User } from '../../../../../../models/user';

import { UserService } from '../../../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user:User;
  userSubscription:Subscription
  constructor(private userService:UserService) { }

  ngOnInit () {
      this.userSubscription = this.userService.getUser().subscribe((user:User) => {
        this.user = user;
      })
  }

  ngOnDestroy () {
    this.userSubscription.unsubscribe();
  }

}
