import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { ActivatedRoute } from '@angular/router';
import { GroupTypeService } from 'src/app/services/group-type.service';
import { GroupType } from 'src/app/models/group-type';

@Component({
  selector: 'edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, OnDestroy {

  groupTypes:GroupType[];
  message:string;
  note:Note;
  private groupTypeSubscription:Subscription; 
  private noteSubscription:Subscription;
  
  constructor(private noteService:NoteService, private groupTypeService:GroupTypeService, private route:ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.noteSubscription = this.noteService.getNote(id).subscribe(note => {
      this.note = note;
      console.log(this.note);
    })
    this.groupTypeSubscription = this.groupTypeService.getGroupTypes().subscribe(groupTypes => {
      this.groupTypes = groupTypes
    })
  }

  ngOnDestroy () {
    this.noteSubscription.unsubscribe();
    this.groupTypeSubscription.unsubscribe()
  }

  submit(form) {
    this.noteService.saveNote(this.note).subscribe(
      () => { this.message = 'A jegyzet mentése sikeres' },
      () => { this.message = 'A jegyzet mentése sikertelen' }
      )
  }

}
