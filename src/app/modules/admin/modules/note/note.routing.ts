import { Routes } from "@angular/router";

import { NotesComponent } from "./components/notes/notes.component";
import { EditNoteComponent } from "./edit-note/edit-note.component";
import { UserGuard } from "src/app/services/user-guard";

export const noteRoutes:Routes = [
    { path: 'notes', component: NotesComponent, canActivate: [ UserGuard ], data: { roleId: 1 } },
    { path: 'note/edit/:id', component: EditNoteComponent, canActivate: [ UserGuard ], data: { roleId: 1 } }
]