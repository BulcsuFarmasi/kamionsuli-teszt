import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Subscription } from 'rxjs';


import { User } from '../../../../models/user';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  id: number;
  user:User;
  userSubscription:Subscription;
  constructor(private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')
    this.userSubscription = this.userService.getUser(this.id).subscribe((user:User) => {
      this.user = user;
    });
  }

}
