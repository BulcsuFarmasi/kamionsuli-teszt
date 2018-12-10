import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotesComponent } from './components/notes/notes.component';
import { FormsModule } from '@angular/forms';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { GroupTypeModule } from '../group-type/group-type.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GroupTypeModule
  ],
  declarations: [NotesComponent, EditNoteComponent]
})
export class NoteModule { }
