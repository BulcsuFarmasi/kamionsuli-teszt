import { Routes } from "@angular/router";
import { NotesComponent } from "./components/notes/notes.component";
import { UserGuard } from "src/app/services/user-guard";

export const noteRoutes:Routes = [
    { path: 'notes', component: NotesComponent, canActivate: [ UserGuard ], data: { roleId: 1 } }
    { path: 'note/edit/:id', component: NotesComponent, canActivate: [ UserGuard ], data: { roleId: 1 } }
]