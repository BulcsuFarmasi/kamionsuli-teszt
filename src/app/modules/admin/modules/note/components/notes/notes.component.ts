import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notes:Note[];
  private notesSubsciption:Subscription;
  
  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.notesSubsciption = this.noteService.getNotes(0).subscribe(notes => {this.notes = notes});
  }

  ngOnDestroy() {
    this.notesSubsciption.unsubscribe();
  }

}
