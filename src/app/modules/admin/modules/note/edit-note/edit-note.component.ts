import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { GroupTypeService } from 'src/app/services/group-type.service';
import { GroupType } from 'src/app/models/group-type';
import { FileError } from 'src/app/models/file-error';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, OnDestroy {

  groupTypes:GroupType[];
  fileError:FileError = { valid: true };
  fileSize: number = 50;
  message:string;
  note:Note;
  selectedFile:File;
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

  checkFileSize () {
    if (this.selectedFile.size > this.fileSize * 1024 * 1024) {
      this.fileError.size = true;
      this.fileError.valid = false;
    }
  }

  checkFileType () {
    const allowedFileTypes = ['application/pdf', 'application/msword', '	application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedFileTypes.includes(this.selectedFile.type)) {
      this.fileError.type = true;
      this.fileError.valid = false;
    }
  }

  checkFileValidity () {

    this.checkFileSize();

    this.checkFileType();
  }

  onFileChanged (event) {
    this.selectedFile = <File> event.target.files[0];
    this.checkFileValidity();
  }

  submit(form) {
    this.noteService.saveNote(this.note).subscribe(
      () => { 
        this.message = 'A jegyzet mentése sikeres';
        if (this.selectedFile && this.fileError.valid) {
          this.noteService.uploadNoteFile(this.note.id, this.selectedFile).subscribe(
            (response:any) => { 
              this.message = 'A fájl mentése sikeres';
              this.note.path = response.path; 
            },
            () => { this.message = 'A fájl mentése sikertelen' }
          )
        }
      },
      () => { this.message = 'A jegyzet mentése sikertelen' }
      )
  }

}
