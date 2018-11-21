import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes:Observable<Note[]>;

  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.notes = this.noteService.getNotes();
  }

}
