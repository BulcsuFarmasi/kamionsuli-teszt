import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @Input('groupTypeId') groupTypeId:number;
  notes:Observable<Note[]>;

  constructor(private noteService:NoteService) { }

    ngOnInit() {
      this.notes = this.noteService.getNotes(this.groupTypeId);
    }

}
