import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { RouterModule } from '@angular/router';
import { LocationRoutingModule } from './location-routing.module';
import { LocationRegisterComponent } from './location-register/location-register.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationDeleteComponent } from './location-delete/location-delete.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LocationRoutingModule,
    LocationListComponent,
    LocationRegisterComponent,
    LocationEditComponent,
    LocationDeleteComponent
  ],
  declarations: [],
  exports: [LocationListComponent]
})
export class LocationModule { }
