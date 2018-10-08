import { from } from "rxjs";

import { GroupsComponent } from "./groups.component";
import { GroupService } from "../../../../../../services/group.service";
import { Group } from "../../../../../../models/group";

describe('GroupsComponent', () => {
    
    let groupsComponent:GroupsComponent;
    let groupsService:GroupService;

    beforeEach(() => {
        groupsService = new GroupService(null);
        groupsComponent = new GroupsComponent(groupsService);
    })

    it('should get groups from the server', () => {
        let groups:any[] = [1, 2, 3]
        spyOn(groupsService,'getGroups').and.returnValue(from([groups]));

        groupsComponent.ngOnInit();

        expect(groupsComponent.groups).toEqual(groups);
    })
})