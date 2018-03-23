import { TestBed, inject } from '@angular/core/testing';

import { OrdersProviderService } from './orders-provider.service';

describe('OrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersProviderService]
    });
  });

  it('should be created', inject([OrdersProviderService], (service: OrdersProviderService) => {
    expect(service).toBeTruthy();
  }));
});
