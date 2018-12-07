import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Note } from '../models/note';
import { NetworkService } from './network.service';

@Injectable()
export class NoteService {

  constructor(private networkService:NetworkService) {}

  addUser () {
		return this.networkService.post('note',{});
	}

  deleteNote (id:number) {
		return this.networkService.delete('note/' + id)
			.pipe(
				map((response:any) => {
					if (response.errorCode) {
						throwError(response);
					}
				}
			)
		)
	}
  
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
