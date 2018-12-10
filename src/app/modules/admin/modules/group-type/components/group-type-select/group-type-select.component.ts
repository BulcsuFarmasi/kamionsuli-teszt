import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import { GroupType } from 'src/app/models/group-type';
import { GroupTypeService } from 'src/app/services/group-type.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'group-type-select',
  templateUrl: './group-type-select.component.html',
  styleUrls: ['./group-type-select.component.scss']
})
export class GroupTypeSelectComponent implements OnInit, OnDestroy {

  groupTypes:GroupType[];
  groupTypesSubscription:Subscription;
  @Input('selectedId') selectedId:number;
  @Output('groupTypeChange') change:EventEmitter<number> = new EventEmitter();

  constructor(private groupTypeService:GroupTypeService) { }

  ngOnInit() {
    console.log(this.selectedId);
    this.groupTypesSubscription = this.groupTypeService.getGroupTypes().subscribe(groupTypes => {
      this.groupTypes = groupTypes
    })
  }

  ngOnDestroy () {
    this.groupTypesSubscription.unsubscribe();
  }

  onChange (event) {
    this.change.emit(this.selectedId);
  }

}
