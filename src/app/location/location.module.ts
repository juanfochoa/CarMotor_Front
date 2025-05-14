import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { RouterModule } from '@angular/router';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LocationRoutingModule,
    LocationListComponent
  ],
  declarations: [],
  exports: [LocationListComponent]
})
export class LocationModule { }
