import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankingListComponent } from './banking-list/banking-list.component';

const routes: Routes = [
  { path: 'bankings/list', component: BankingListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankingRoutingModule {}
