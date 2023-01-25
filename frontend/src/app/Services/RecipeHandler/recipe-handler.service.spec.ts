import { TestBed } from '@angular/core/testing';

import { RecipeHandlerService } from './recipe-handler.service';

describe('RecipeHandlerService', () => {
  let service: RecipeHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
