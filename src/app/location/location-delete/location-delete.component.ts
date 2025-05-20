// src/app/location/location-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocationService } from '../location.service';
import { Location } from '../location';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-delete',
  templateUrl: './location-delete.component.html',
  styleUrls: ['./location-delete.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class LocationDeleteComponent implements OnInit {
  locations: Location[] = [];
  error: string | null = null;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  private loadLocations() {
    this.locationService.getLocations().subscribe({
      next: list => this.locations = list,
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de sedes';
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/locations', id, 'edit']);
  }

  delete(id: number): void {
    if (!confirm('¿Eliminar esta sede?')) return;
    this.locationService.deleteLocation(id).subscribe({
      next: () => {
        this.locations = this.locations.filter(l => l.id !== id);
      },
      error: err => {
        console.error(err);
        this.error = 'Error al eliminar la sede';
      }
    });
  }
}
