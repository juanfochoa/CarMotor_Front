// src/app/vehicle/vehicle-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-delete',
  templateUrl: './vehicle-delete.component.html',
  styleUrls: ['./vehicle-delete.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class VehicleDeleteComponent implements OnInit {
  vehicles: Vehicle[] = [];
  error: string | null = null;

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  private loadVehicles() {
    this.vehicleService.getVehicles().subscribe({
      next: list => this.vehicles = list,
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de vehículos';
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/vehicles', id, 'edit']);
  }

  delete(id: number): void {
    if (!confirm('¿Eliminar este vehículo?')) return;
    this.vehicleService.deleteVehicle(id).subscribe({
      next: () => {
        this.vehicles = this.vehicles.filter(v => v.id !== id);
      },
      error: err => {
        console.error(err);
        this.error = 'Error al eliminar el vehículo';
      }
    });
  }
}
