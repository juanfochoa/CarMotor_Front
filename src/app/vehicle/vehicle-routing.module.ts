import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleRegisterComponent } from './vehicle-register/vehicle-register.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleDeleteComponent } from './vehicle-delete/vehicle-delete.component';

const routes: Routes = [
  {
    path: 'vehicles',
    children: [
      { path: 'list', component: VehicleListComponent },
      { path: 'create', component: VehicleRegisterComponent },
      { path: ':id/edit', component: VehicleEditComponent },
      { path: 'delete', component: VehicleDeleteComponent },
      { path: ':id', component: VehicleDetailComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule {}
