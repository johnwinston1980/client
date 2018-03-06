import { TestBed, inject } from '@angular/core/testing';

import { BroadcastObjectService } from './broadcast-object.service';

describe('BroadcastObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroadcastObjectService]
    });
  });

  it('should be created', inject([BroadcastObjectService], (service: BroadcastObjectService) => {
    expect(service).toBeTruthy();
  }));
});
