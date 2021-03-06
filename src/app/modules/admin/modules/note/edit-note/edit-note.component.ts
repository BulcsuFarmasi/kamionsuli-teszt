import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

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
  private noteSubscription:Subscription;
  
  constructor(private noteService:NoteService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.noteSubscription = this.noteService.getNote(id).subscribe(note => {
      this.note = note;
    })
  }

  ngOnDestroy () {
    this.noteSubscription.unsubscribe();
  }

  checkFileSize () {
    if (this.selectedFile.size > this.fileSize * 1024 * 1024) {
      this.fileError.size = true;
      this.fileError.valid = false;
    }
  }

  checkFileType () {
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    console.log(this.selectedFile.type)
    
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

  onGroupTypeChange (event) {
    console.log(event)
    this.note.groupTypeId = event;
  }

  submit(form) {
    this.noteService.saveNote(this.note).subscribe(
      () => { 
        this.message = 'A jegyzet mentése sikeres';
        if (this.selectedFile && this.fileError.valid) {
          this.noteService.uploadNoteFile(this.note.id, this.selectedFile).subscribe(
            (response:any) => { 
              this.router.navigate(['/admin/notes'])
            },
            () => { this.message = 'A fájl mentése sikertelen' }
          )
        }
      },
      () => { this.message = 'A jegyzet mentése sikertelen' }
      )
  }

}
