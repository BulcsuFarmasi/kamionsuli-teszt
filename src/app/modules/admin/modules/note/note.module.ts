import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotesComponent } from './components/notes/notes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NotesComponent]
})
export class NoteModule { }
