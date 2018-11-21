import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../models/note';

@Injectable()
export class NoteService {

  constructor(private networkService:NetworkService) {}

  getNotes ():Observable<Note[]> {
    return <Observable<Note[]>> this.networkService.get('notes');
  }


}
