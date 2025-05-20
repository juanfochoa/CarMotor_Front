import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationRegisterComponent } from './location-register/location-register.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationDeleteComponent } from './location-delete/location-delete.component';

const routes: Routes = [
  { path: 'locations',
    children: [
      { path: 'list', component: LocationListComponent },
      { path: 'create', component: LocationRegisterComponent },
      { path: ':id/edit', component: LocationEditComponent },
      { path: 'delete', component: LocationDeleteComponent }, 
      { path: ':id', component: LocationDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
