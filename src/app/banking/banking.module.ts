import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingRoutingModule } from './banking-routing.module';
import { BankingListComponent } from './banking-list/banking-list.component';
import { RouterModule } from '@angular/router';
import { BankingRegisterComponent } from './banking-register/banking-register.component';
import { BankingEditComponent } from './banking-edit/banking-edit.component';
import { BankingDeleteComponent } from './banking-delete/banking-delete.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BankingRoutingModule,
    BankingListComponent,
    BankingRegisterComponent,
    BankingEditComponent,
    BankingDeleteComponent
  ]
})
export class BankingModule {}
