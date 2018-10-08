import { Route } from "@angular/router";
import { GroupsComponent } from './components/groups/groups.component';

import { UserGuard } from "../../../../services/user-guard";
import { groupRoutes } from './group.routing';

describe('groupRoutes', () => {
    it('should contain a route for groups', () => {
        let route:Route = {path: 'groups', component: GroupsComponent, canActivate: [UserGuard]};

        expect(groupRoutes).toContain(route);
    })
})