import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../location';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class LocationListComponent implements OnInit {
  
  locations: Array<Location> = [];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations().subscribe(
      (locations) => {
        this.locations = locations;
      }
    )
  }

}
