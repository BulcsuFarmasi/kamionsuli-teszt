import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  message:string;
  users:User[]
  private addUserSubscription:Subscription;
  private groupId:number;
  private userSubscription:Subscription;

  
  constructor(private userService:UserService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit () {
    this.groupId = +this.route.snapshot.paramMap.get('groupId')
    this.userSubscription = this.userService.getUsers(this.groupId).subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy () {
    if (this.addUserSubscription) {
      this.addUserSubscription.unsubscribe();
    }
    this.userSubscription.unsubscribe();
  }

  addUser () {
    this.addUserSubscription = this.userService.addUser(this.groupId).subscribe((user:User) => {
      this.router.navigate(['/admin/user/edit/', user.id]);
    })
  }

  checkAll () {
    this.users = this.users.map(user => {
      user.checked = true;
      return user;
    })
  }

  deleteChecked () {
    this.users.forEach((user, index) => {
      if (user.checked){
        this.users.splice(index, 1);
        this.userService.deleteUser(user.id).subscribe(
          () => {
            this.message = `A ${user.name} nevű felhasználó törlése sikeres`
          }, 
          () => {
            this.message = `A ${user.name} nevű felhasználó törlése sikertelen`;
            this.users.splice(index,  0, user)
          }
        )
      }
    })
    setTimeout(() => {
      this.message = '';
    },10000)
  }

}
