import { empty } from 'rxjs';

import { GroupService } from './group.service';
import { NetworkService } from './network.service';

describe('GroupService', () => {
  let groupService:GroupService;
  let networkService:NetworkService;

  beforeEach(() => {
    networkService = new NetworkService(null, null)
    groupService = new GroupService(networkService);
  })
  
  describe('getGroups', () => {
    it ('should call networkService.get with groups param', () => {
      let param = 'groups';
      let spy = spyOn(networkService, 'get').and.returnValue(empty());

      groupService.getGroups();

      expect(spy).toHaveBeenCalledWith(param);
    });
  })
});
