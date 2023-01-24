import { TestBed } from '@angular/core/testing';

import { PantryServiceService } from './pantry.service';

describe('PantryServiceService', () => {
  let service: PantryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PantryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
