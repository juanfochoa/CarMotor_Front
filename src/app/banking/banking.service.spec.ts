/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BankingService } from './banking.service';

describe('Service: Banking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankingService]
    });
  });

  it('should ...', inject([BankingService], (service: BankingService) => {
    expect(service).toBeTruthy();
  }));
});
