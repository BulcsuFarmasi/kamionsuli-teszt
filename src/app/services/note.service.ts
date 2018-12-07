import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Group } from '../models/group';
import { Note } from '../models/note';
import { NetworkService } from './network.service';
import { map } from 'rxjs/operators';

@Injectable()
export class NoteService {

  constructor(private networkService:NetworkService) {}

  getNotes (groupTypeId:number):Observable<Note[]> {
    return <Observable<Note[]>> this.networkService.get('notes/' + groupTypeId)
           .pipe(map((notes:Note[]) => {
                  notes.map((note:any) => {
                    note.groupType = note.group_type;
                    delete note.group_type;
                    return note;
                  })
                  return notes;
                }));
  }


}
