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
  message:string;
  private groupSubscription:Subscription;
  
  constructor(private groupService:GroupService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.groupSubscription = this.groupService.getGroup(id).subscribe((group:Group) => {
      this.group = group;
    })

  }

  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
  }

  submit (form) {
    this.groupService.saveGroup(this.group).subscribe(
      () => {
        this.router.navigate(['/admin/groups'])
      },
      () => {
        this.message = 'A csoport mentése sikertelen';
      }
    )
  }

}
