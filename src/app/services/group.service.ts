import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Group } from '../models/group';
import { NetworkService } from './network.service';

@Injectable()
export class GroupService {

  constructor(private networkService:NetworkService) { }

  addGroup ():Observable<Group> {
    return <Observable<Group>>this.networkService.post('groups', {});
  }

  deleteGroup (id:number) {
    return this.networkService.delete('group/' + id);
  }

  getGroup (id:number):Observable<Group>  {
    return <Observable<Group>> this.networkService.get('group/' + id)
      .pipe(map(this.transfromGroup));
  }
  
  getGroups ():Observable<Group[]> {
    return <Observable<Group[]>> this.networkService.get('groups')
      .pipe(map((groups:Group[]) => {
        return groups.map(this.transfromGroup);
      }))
  }

  saveGroup (group:Group) {
    return this.networkService.patch('group/' + group.id, { name: group.name, typeId: group.typeId })
      .pipe(map((response:any) => {
        if (response && response.errorCode) {
          throwError(response);
        } else {
          return response;
        }
      }))
  }

  private transfromGroup (group:Group) {
    group.accessFrom = new Date(group.accessFrom);
    group.accessTo = new Date(group.accessTo);
    return group;
  }
}