import { FillModule } from './fill.module';

describe('FillModule', () => {
  let fillModule: FillModule;

  beforeEach(() => {
    fillModule = new FillModule();
  });

  it('should create an instance', () => {
    expect(fillModule).toBeTruthy();
  });
});
