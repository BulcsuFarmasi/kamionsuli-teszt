import { GroupTypeModule } from './group-type.module';

describe('GroupTypeModule', () => {
  let groupTypeModule: GroupTypeModule;

  beforeEach(() => {
    groupTypeModule = new GroupTypeModule();
  });

  it('should create an instance', () => {
    expect(groupTypeModule).toBeTruthy();
  });
});
