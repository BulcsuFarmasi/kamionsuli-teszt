import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GroupType } from '../models/group-type';

@Injectable()
export class GroupTypeService {

  constructor(private networkService) { }

  getGroupTypes () {
    return <Observable<GroupType>> this.networkService.get('groupTypes')
  }
}
