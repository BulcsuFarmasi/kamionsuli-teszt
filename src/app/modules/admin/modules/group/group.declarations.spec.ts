import { components } from "./group.declarations";
import { GroupsComponent } from "./components/groups/groups.component";

describe('groupDeclarations', () => {
    describe('components', () => {
        it('should contain groups component', () => {
            expect(components).toContain(GroupsComponent);
        })
    })
})