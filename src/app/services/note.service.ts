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

  saveNote (note:Note) {
    return this.networkService.patch('note/' + note.id, { title: note.title, groupTypeId: note.groupTypeId })
      .pipe(map((response:any) => {
        if (response && response.errorCode) {
          throwError(response);
        } else {
          return response;
        }
      }))
  }

  uploadNoteFile (id: number, file: File) {
    const formData = new FormData();
    formData.append('note', file, file.name);

    console.log(formData);

    return this.networkService.post(`note/${id}/uploadFile`, formData)
    .pipe(map((response:any) => {
      if (response && response.errorCode) {
        throwError(response);
      }
    }));
  }

  private transformNote (note:any) {
      note.groupType = note.group_type;
      delete note.group_type;
      return note;
  }


}
