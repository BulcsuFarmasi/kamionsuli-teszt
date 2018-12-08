import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit, OnDestroy {

  group:Group;
  private groupSubscription:Subscription;
  
  constructor(private groupService:GroupService) { }

  ngOnInit() {
    this.groupSubscription = this.groupService.getGroup(id).subscribe((group:Group) => {
      this.group = group;
      console.log(this.group);
    })
  }

  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
  }

}
