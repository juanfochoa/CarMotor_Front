import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { VehicleDetail } from '../vehicleDetail'; // cambio importante
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class VehicleDetailComponent implements OnInit {
  vehicle!: VehicleDetail;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.vehicleService.getVehicle(+id).subscribe(v => this.vehicle = v);
    }
  }
}
