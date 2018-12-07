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

  message:string
  notes:Note[];
  private notesSubsciption:Subscription;
  
  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.notesSubsciption = this.noteService.getNotes(0).subscribe(notes => {this.notes = notes});
  }

  ngOnDestroy() {
    this.notesSubsciption.unsubscribe();
  }

  checkAll () {
    this.notes = this.notes.map(user => {
      user.checked = true;
      return user;
    })
  }

  deleteChecked () {
    this.notes.forEach((note, index) => {
      if (note.checked){
        this.notes.splice(index, 1);
        this.noteService.deleteNote(note.id).subscribe(
          () => {
            this.message = `A ${note.title} című jegyzet törlése sikeres`
          }, 
          () => {
            this.message = `A ${note.title} című jegyzet törlése sikertelen`;
            this.notes.splice(index,  0, note)
          }
        )
      }
    })
    setTimeout(() => {
      this.message = '';
    },10000)
  }

}
