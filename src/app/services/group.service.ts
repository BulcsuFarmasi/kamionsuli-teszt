import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { map } from 'rxjs/operators';

@Injectable()
export class GroupService {

  constructor(private networkService:NetworkService) { }

  getGroups ():Observable<Group[]> {
    return <Observable<Group[]>> this.networkService.get('groups')
      .pipe(map((groups:Group[]) => {
        return groups.map(group => {
          group.accessFrom = new Date(group.accessFrom);
          group.accessTo = new Date(group.accessTo);
          return group;
        })
      }))
  }

  deleteGroup (id:number) {
    return this.networkService.delete('group/' + id);
  }
}
