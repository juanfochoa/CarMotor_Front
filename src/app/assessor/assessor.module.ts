import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessorRoutingModule } from './assessor-routing.module';
import { RouterModule } from '@angular/router';
import { AssessorListComponent } from './assessor-list/assessor-list.component';
import { AssessorEditComponent } from './assessor-edit/assessor-edit.component';
import { AssessorDeleteComponent } from './assessor-delete/assessor-delete.component';
import { AssessorRegisterComponent } from './assessor-register/assessor-register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AssessorRoutingModule,
    AssessorListComponent,
    AssessorEditComponent,
    AssessorDeleteComponent,
    AssessorRegisterComponent
  ]
})
export class AssessorModule { }
