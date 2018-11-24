import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Group } from '../../../../../../models/group';
import { GroupService } from '../../../../../../services/group.service';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups:Group[];
  getGroupsSubscription:Subscription;
  
  constructor(private groupService:GroupService, private router:Router) { }

  ngOnInit() {
    this.getGroupsSubscription = this.groupService.getGroups().subscribe(groups => this.groups = groups);
  }

  ngOnDestroy () {
      this.getGroupsSubscription.unsubscribe();
  }

  addGroup() {
    this.groupService.addGroup().subscribe((group) => {
        this.router.navigate(['/admin/group/edit', group.id]);
    })
  }

  deleteGroup (group) {
    this.groupService.deleteGroup(group.id).subscribe(() => {
      const index = this.groups.indexOf(group);
      this.groups.splice(index, 1);
    })
  }

}
