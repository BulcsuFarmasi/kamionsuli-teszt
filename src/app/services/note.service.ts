import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Group } from '../models/group';
import { Note } from '../models/note';
import { NetworkService } from './network.service';

@Injectable()
export class NoteService {

  constructor(private networkService:NetworkService) {}

  getNotes (groupTypeId:number):Observable<Note[]> {
    return <Observable<Note[]>> this.networkService.get('notes/' + groupTypeId);
  }


}
