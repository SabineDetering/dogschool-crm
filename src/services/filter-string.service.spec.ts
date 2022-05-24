import { TestBed } from '@angular/core/testing';

import { FilterStringService } from './filter-string.service';

describe('FilterStringService', () => {
  let service: FilterStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
