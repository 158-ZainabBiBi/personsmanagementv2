import { TestBed } from '@angular/core/testing';

import { PersonattributevalueService } from './personattributevalue.service';

describe('PersonattributevalueService', () => {
  let service: PersonattributevalueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonattributevalueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
