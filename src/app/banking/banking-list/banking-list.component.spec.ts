/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BankingListComponent } from './banking-list.component';

describe('BankingListComponent', () => {
  let component: BankingListComponent;
  let fixture: ComponentFixture<BankingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
