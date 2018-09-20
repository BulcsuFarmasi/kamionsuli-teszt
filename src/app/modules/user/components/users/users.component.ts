import { Component, OnInit } from '@angular/core';

import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:User[]
  userSubscription:Subscription;
  message:string;
  
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userSubscription = this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser () {
    
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
