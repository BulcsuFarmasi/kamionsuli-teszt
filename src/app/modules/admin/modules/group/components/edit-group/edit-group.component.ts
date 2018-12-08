import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { GroupTypeService } from 'src/app/services/group-type.service';
import { GroupType } from 'src/app/models/group-type';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit, OnDestroy {

  group:Group;
  groupTypes:GroupType[];
  private groupTypesSubscription:Subscription;
  private groupSubscription:Subscription;
  
  constructor(private groupService:GroupService, private groupTypeService:GroupTypeService, private route:ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.groupSubscription = this.groupService.getGroup(id).subscribe((group:Group) => {
      this.group = group;
    })
    this.groupTypesSubscription = this.groupTypeService.getGroupTypes().subscribe((groupTypes:GroupType[]) => {
      this.groupTypes = groupTypes;
    })

  }

  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
  }

}
