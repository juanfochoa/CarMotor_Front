import { Component, Input, OnInit } from '@angular/core';
import { LocationDetail } from '../locationDetail';
import { LocationService } from '../location.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class LocationDetailComponent implements OnInit {

  @Input() locationDetail!: LocationDetail;
  locationId!: number;

  constructor(private locationService: LocationService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.locationDetail === undefined) {
      this.locationId = this.route.snapshot.params['id'];
      if (this.locationId) {
        this.getLocation();
      }
    }
  }

  getLocation() {
    this.locationService.getLocation(this.locationId).subscribe(location => {
      this.locationDetail = location;
      console.log(this.locationDetail);
    });
  }

}
