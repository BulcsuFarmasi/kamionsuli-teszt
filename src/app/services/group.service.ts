import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { map } from 'rxjs/operators';

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

  transfromGroup (group:Group) {
    group.accessFrom = new Date(group.accessFrom);
    group.accessTo = new Date(group.accessTo);
    return group;
  }
}
