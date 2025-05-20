import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleRegisterComponent } from './vehicle-register/vehicle-register.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleDeleteComponent } from './vehicle-delete/vehicle-delete.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VehicleRoutingModule,
    VehicleListComponent,
    VehicleRegisterComponent,
    VehicleEditComponent,
    VehicleDeleteComponent
  ]
})
export class VehicleModule {}
