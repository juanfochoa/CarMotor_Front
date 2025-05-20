// src/app/vehicle/vehicle-register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { LocationService } from '../../location/location.service';
import { AssessorService } from '../../assessor/assessor.service';
import { Location } from '../../location/location';
import { Assessor } from '../../assessor/assessor';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
})
export class VehicleRegisterComponent implements OnInit {
  form!: FormGroup;
  locations: Location[] = [];
  assessors: Assessor[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private locationService: LocationService,
    private assessorService: AssessorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1) Formulario reactivo
    this.form = this.fb.group({
      brand: ['', Validators.required],
      series: ['', Validators.required],
      lastPlateDigit: ['', [Validators.required, Validators.maxLength(1)]],
      model: ['', Validators.required],
      type: ['', Validators.required],
      capacity: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      locationId: [null, Validators.required],
      assessorId: [null, Validators.required]
    });

    // 2) Cargar sedes
    this.locationService.getLocations().subscribe({
      next: locs => this.locations = locs,
      error: () => this.error = 'No se pudieron cargar las sedes'
    });

    // 3) Cargar asesores
    this.assessorService.getAssessors().subscribe({
      next: as => this.assessors = as,
      error: () => this.error = 'No se pudieron cargar los asesores'
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const {
      brand, series, lastPlateDigit, model,
      type, capacity, price, locationId, assessorId
    } = this.form.value;

    const payload = {
      brand,
      series,
      lastPlateDigit,
      model,
      type,
      capacity,
      price,
      location: { id: locationId },
      assessor: { id: assessorId }
    };

    this.vehicleService.addVehicle(payload as any).subscribe({
      next: () => this.router.navigate(['/vehicles/list']),
      error: err => {
        console.error(err);
        this.error = 'Error al registrar el vehículo';
      }
    });
  }
}
