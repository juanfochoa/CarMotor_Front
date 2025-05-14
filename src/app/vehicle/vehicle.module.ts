import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VehicleRoutingModule,
    VehicleListComponent // standalone component import
  ]
})
export class VehicleModule {}
