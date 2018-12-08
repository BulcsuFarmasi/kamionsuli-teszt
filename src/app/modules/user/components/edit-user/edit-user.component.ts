import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Subscription } from 'rxjs';


import { User } from '../../../../models/user';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  groupId:number;
  message:string;
  user:User;
  private saveUserSubscription:Subscription;
  private userSubscription:Subscription;
  constructor(private route:ActivatedRoute, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.groupId = +this.route.snapshot.paramMap.get('groupId');
    let id:number = +this.route.snapshot.paramMap.get('id');
    this.userSubscription = this.userService.getUser(id).subscribe((user:User) => {
      this.user = user;
    });
  }

  ngOnDestroy () {
    if (this.saveUserSubscription) {
      this.saveUserSubscription.unsubscribe();
    }
    this.userSubscription.unsubscribe();
  } 

  saveUser () {
    this.saveUserSubscription = this.userService.saveUser(this.user).subscribe(
      () => {
        this.router.navigate(['/admin/users', this.groupId]);
      }, 
      () => {
        this.message = `A tanuló mentése sikertelen`;
      }
    );
  }

}
