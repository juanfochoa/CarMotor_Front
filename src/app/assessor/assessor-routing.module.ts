import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessorListComponent } from './assessor-list/assessor-list.component';
import { AssessorDetailComponent } from './assessor-detail/assessor-detail.component';

const routes: Routes = [
  {
    path: 'assessors',
    children: [
      { path: 'list', component: AssessorListComponent },
      { path: ':id', component: AssessorDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessorRoutingModule {}
