import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, OnDestroy {

  note:Note;
  noteSubscription:Subscription;
  
  constructor(private noteService:NoteService, private route:ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.noteSubscription = this.noteService.getNote(id).subscribe(note => {
      this.note = note;
      console.log(this.note);
    })
  }

  ngOnDestroy () {
    this.noteSubscription.unsubscribe();
  }

}
