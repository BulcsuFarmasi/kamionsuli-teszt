import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Subscription } from 'rxjs';


import { User } from '../../../../models/user';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  user:User;
  private saveAccessFromSubscription:Subscription;
  private saveAccessToSubscription:Subscription;
  private saveEmailSubscription:Subscription;
  private saveNameSubscription:Subscription;
  private sendNotificationEmailSubscription:Subscription;
  private userSubscription:Subscription;
  constructor(private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit() {
    let id:number = +this.route.snapshot.paramMap.get('id')
    this.userSubscription = this.userService.getUser(id).subscribe((user:User) => {
      this.user = user;
    });
  }

  ngOnDestroy () {
    if (this.saveAccessFromSubscription) {
      this.saveAccessFromSubscription.unsubscribe();
    }
    if (this.saveAccessToSubscription) {
      this.saveAccessToSubscription.unsubscribe();
    }
    if (this.saveEmailSubscription) {
      this.saveEmailSubscription.unsubscribe();
    }
    if (this.saveNameSubscription) {
      this.saveNameSubscription.unsubscribe();
    }
    if (this.sendNotificationEmailSubscription) {
      this.sendNotificationEmailSubscription.unsubscribe();
    }
    this.userSubscription.unsubscribe();
  } 

  saveAccessFrom (accessFrom) {
    this.saveAccessFromSubscription = this.userService.saveAccessFrom(this.user.id, accessFrom).subscribe();
  }

  saveAccessTo (accessTo) {
    this.saveAccessToSubscription = this.userService.saveAccessTo(this.user.id, accessTo).subscribe();
  }
  
  saveEmail (email) {
    this.saveEmailSubscription = this.userService.saveEmail(this.user.id, email).subscribe();
  }

  saveName (name) {
    this.saveNameSubscription = this.userService.saveName(this.user.id, name).subscribe();
  }

  sendNotificationEmail () {
    this.sendNotificationEmailSubscription = this.userService.sendNotificationEmail(this.user.id).subscribe();
  }

}
