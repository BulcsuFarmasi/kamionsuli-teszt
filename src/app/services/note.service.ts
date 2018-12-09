import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Note } from '../models/note';
import { NetworkService } from './network.service';

@Injectable()
export class NoteService {

  constructor(private networkService:NetworkService) {}

  addNote () {
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
  
  getNote (id:number):Observable<Note> {
    return <Observable<Note>> this.networkService.get('note/' + id)
    .pipe(map(this.transformNote));
  }
  
  getNotes (groupTypeId:number):Observable<Note[]> {
    return <Observable<Note[]>> this.networkService.get('notes/' + groupTypeId)
           .pipe(map((notes:Note[]) => {
                  notes.map(this.transformNote);
                  return notes;
                }));
  }

  private transformNote (note:any) {
      note.groupType = note.group_type;
      delete note.group_type;
      return note;
  }


}
