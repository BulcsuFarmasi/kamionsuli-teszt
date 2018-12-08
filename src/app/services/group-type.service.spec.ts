import { TestBed, inject } from '@angular/core/testing';

import { GroupTypeService } from './group-type.service';

describe('GroupTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupTypeService]
    });
  });

  it('should be created', inject([GroupTypeService], (service: GroupTypeService) => {
    expect(service).toBeTruthy();
  }));
});
