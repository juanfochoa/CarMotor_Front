import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessorRoutingModule } from './assessor-routing.module';
import { RouterModule } from '@angular/router';
import { AssessorListComponent } from './assessor-list/assessor-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AssessorRoutingModule,
    AssessorListComponent
  ]
})
export class AssessorModule { }
