/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssessorService } from './assessor.service';

describe('Service: Assessor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessorService]
    });
  });

  it('should ...', inject([AssessorService], (service: AssessorService) => {
    expect(service).toBeTruthy();
  }));
});
