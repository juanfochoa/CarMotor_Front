// src/app/assessor/assessor-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessorListComponent } from './assessor-list/assessor-list.component';
import { AssessorDetailComponent } from './assessor-detail/assessor-detail.component';
import { AssessorEditComponent } from './assessor-edit/assessor-edit.component';
import { AssessorDeleteComponent } from './assessor-delete/assessor-delete.component';
import { AssessorRegisterComponent } from './assessor-register/assessor-register.component';

const routes: Routes = [
  {
    path: 'assessors',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: AssessorListComponent },
      { path: 'create', component: AssessorRegisterComponent },
      { path: 'delete', component: AssessorDeleteComponent },
      { path: ':id/edit', component: AssessorEditComponent },
      { path: ':id', component: AssessorDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessorRoutingModule {}
