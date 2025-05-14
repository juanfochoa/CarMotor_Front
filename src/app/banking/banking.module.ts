import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingRoutingModule } from './banking-routing.module';
import { BankingListComponent } from './banking-list/banking-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BankingRoutingModule,
    BankingListComponent
  ]
})
export class BankingModule {}
