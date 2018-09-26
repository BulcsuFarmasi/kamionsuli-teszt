import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users:User[]
  message:string;
  private userSubscription:Subscription;
  private addUserSubscription:Subscription;
  
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit () {
    this.userSubscription = this.userService.getUsers().subscribe(users => {
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
    this.addUserSubscription = this.userService.addUser().subscribe((user:User) => {
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
    this.users.forEach((user, index, users) => {
      if (user.checked){
        users.splice(index, 1);
        this.userService.deleteUser(user.id).subscribe(
          () => {
            this.message = `A ${user.name} nevű felhasználó törlése sikeres`
          }, 
          () => {
            this.message = `A ${user.name} nevű felhasználó törlése sikertelen`;
            users.splice(index,  0, user)
          }
        )
      }
    })
    setTimeout(() => {
      this.message = '';
    },10000)
  }

}
