import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GroupType } from '../models/group-type';
import { NetworkService } from './network.service';

@Injectable()
export class GroupTypeService {

  constructor(private networkService:NetworkService) { }

  getGroupTypes ():Observable<GroupType[]> {
    return <Observable<GroupType[]>> this.networkService.get('groupTypes');
  }
}
