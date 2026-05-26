import { TestBed } from '@angular/core/testing';

import { OpenalexService } from './openalex.service';

describe('OpenalexService', () => {
  let service: OpenalexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenalexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
