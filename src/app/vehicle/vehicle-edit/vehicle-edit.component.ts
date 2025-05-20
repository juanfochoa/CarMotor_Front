// src/app/vehicle/vehicle-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../vehicle.service';
import { VehicleDetail } from '../vehicleDetail';
import { LocationService } from '../../location/location.service';
import { AssessorService } from '../../assessor/assessor.service';
import { Location } from '../../location/location';
import { Assessor } from '../../assessor/assessor';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class VehicleEditComponent implements OnInit {
  vehicleForm!: FormGroup;
  vehicleId!: number;
  loading = false;
  error: string | null = null;
  locations: Location[] = [];
  assessors: Assessor[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private locationService: LocationService,
    private assessorService: AssessorService
  ) {}

  ngOnInit(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    // 1) crear formulario
    this.vehicleForm = this.fb.group({
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

    this.loading = true;

    // 2) cargar listas para selects
    this.locationService.getLocations().subscribe({
      next: locs => this.locations = locs,
      error: () => this.error = 'No se pudieron cargar sedes'
    });
    this.assessorService.getAssessors().subscribe({
      next: as => this.assessors = as,
      error: () => this.error = 'No se pudieron cargar asesores'
    });

    // 3) cargar datos del vehículo
    this.vehicleService.getVehicle(this.vehicleId).subscribe({
      next: (v: VehicleDetail) => {
        this.vehicleForm.patchValue({
          brand: v.brand,
          series: v.series,
          lastPlateDigit: v.lastPlateDigit,
          model: v.model,
          type: v.type,
          capacity: v.capacity,
          price: v.price,
          locationId: v.location.id,
          assessorId: v.assessor.id
        });
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar los datos del vehículo';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) return;
    const {
      brand, series, lastPlateDigit, model,
      type, capacity, price, locationId, assessorId
    } = this.vehicleForm.value;

    // 4) construir objeto mínimo para el PUT
    const updated: any = {
      id: this.vehicleId,
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

    this.vehicleService.updateVehicle(this.vehicleId, updated).subscribe({
      next: () => this.router.navigate(['/vehicles/list']),
      error: err => {
        console.error(err);
        this.error = 'Error al guardar cambios';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/vehicles/list']);
  }
}