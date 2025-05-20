import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankingListComponent } from './banking-list/banking-list.component';
import { BankingRegisterComponent } from './banking-register/banking-register.component';
import { BankingEditComponent } from './banking-edit/banking-edit.component';
import { BankingDeleteComponent } from './banking-delete/banking-delete.component';

const routes: Routes = [
  {
    path: 'bankings',
    children: [
      { path: 'list', component: BankingListComponent },
      { path: 'create', component: BankingRegisterComponent },
      { path: ':id/edit', component: BankingEditComponent },
      { path: 'delete', component: BankingDeleteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankingRoutingModule {}
