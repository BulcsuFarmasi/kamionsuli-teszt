import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  private addNoteSubsciption:Subscription;
  private deleteNoteSubsciption:Subscription;
  
  constructor(private noteService:NoteService, private router:Router) { }

  ngOnInit() {
    this.notesSubsciption = this.noteService.getNotes(0).subscribe(notes => {this.notes = notes});
  }

  ngOnDestroy() {
    this.notesSubsciption.unsubscribe();
    if (this.addNoteSubsciption) {
      this.addNoteSubsciption.unsubscribe();
    }
    if (this.deleteNoteSubsciption) {
      this.deleteNoteSubsciption.unsubscribe();
    }
  }

  addNote () {
    this.addNoteSubsciption = this.noteService.addNote().subscribe((note:Note) => {
      this.router.navigate(['/admin/note/edit/', note.id]);
    })
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
        this.deleteNoteSubsciption = this.noteService.deleteNote(note.id).subscribe(
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
