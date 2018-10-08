import { Routes } from "@angular/router";

import { GroupsComponent } from "./components/groups/groups.component";
import { UserGuard } from "../../../../services/user-guard";

export const groupRoutes:Routes = [
    {path: 'groups', component: GroupsComponent, canActivate: [UserGuard]}
]