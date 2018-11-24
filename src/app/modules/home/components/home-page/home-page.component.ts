import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user:User;
  
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserSubject().subscribe(user => {
      this.user = user;
    })
  }

}
