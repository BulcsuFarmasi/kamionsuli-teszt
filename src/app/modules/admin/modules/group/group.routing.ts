import { Routes } from "@angular/router";

import { GroupsComponent } from "./components/groups/groups.component";
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { UserGuard } from "../../../../services/user-guard";

export const groupRoutes:Routes = [
    {path: 'groups', component: GroupsComponent, canActivate: [UserGuard], data: {roleId: 1}},
    {path: 'group/edit/:id', component: EditGroupComponent, canActivate: [UserGuard], data: {roleId: 1}}
]