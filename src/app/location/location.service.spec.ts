/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { LocationService } from './location.service';

describe('Service: Location', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService]
    });
  });

  it('should ...', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
