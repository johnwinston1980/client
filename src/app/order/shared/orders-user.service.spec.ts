import { TestBed, inject } from '@angular/core/testing';

import { OrdersUserService } from './orders-user.service';

describe('OrdersUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersUserService]
    });
  });

  it('should be created', inject([OrdersUserService], (service: OrdersUserService) => {
    expect(service).toBeTruthy();
  }));
});
