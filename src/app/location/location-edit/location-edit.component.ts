// src/app/location/location-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocationService } from '../location.service';
import { LocationDetail } from '../locationDetail';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LocationEditComponent implements OnInit {
  locationForm!: FormGroup;
  locationId!: number;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.locationId = Number(this.route.snapshot.paramMap.get('id'));

    // 1) crear el formulario
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      schedule: ['', Validators.required]
    });

    this.loading = true;
    // 2) cargar datos de la sede
    this.locationService.getLocation(this.locationId).subscribe({
      next: (loc: LocationDetail) => {
        this.locationForm.patchValue({
          name: loc.name,
          address: loc.address,
          phoneNumber: loc.phoneNumber,
          schedule: loc.schedule
        });
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'No se pudieron cargar los datos de la sede';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.locationForm.invalid) return;
    const { name, address, phoneNumber, schedule } = this.locationForm.value;
    // 3) construir payload mínimo
    const updated = {
      id: this.locationId,
      name,
      address,
      phoneNumber,
      schedule
    };
    this.locationService.updateLocation(this.locationId, updated as any).subscribe({
      next: () => this.router.navigate(['/locations/list']),
      error: err => {
        console.error(err);
        this.error = 'Error al guardar los cambios';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/locations/list']);
  }
}
