import { TestBed } from '@angular/core/testing';

import { ClientNumberService } from './client-number.service';

describe('GetAvailableClientNumberService', () => {
  let service: ClientNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
