// src/app/assessor/assessor-register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssessorService } from '../assessor.service';
import { LocationService } from '../../location/location.service';
import { Location } from '../../location/location';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assessor-register',
  templateUrl: './assessor-register.component.html',
  styleUrls: ['./assessor-register.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class AssessorRegisterComponent implements OnInit {
  form!: FormGroup;
  locations: Location[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private assessorService: AssessorService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1) Crear el formulario
    this.form = this.fb.group({
      name: ['', Validators.required],
      uriPhoto: ['', Validators.required],
      contactInfo: ['', Validators.required],
      locationId: [null, Validators.required],
    });

    // 2) Cargar las sedes para el select
    this.locationService.getLocations().subscribe({
      next: locs => (this.locations = locs),
      error: err => (this.error = 'No se pudieron cargar las sedes'),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    // 3) Construir el DTO sin id:
    const { name, uriPhoto, contactInfo, locationId } = this.form.value;
    const payload = {
      name,
      uriPhoto,
      contactInfo,
      location: { id: locationId }   // sólo enviamos la referencia
    };

    // 4) Llamar al POST
    this.assessorService.addAssessor(payload as any).subscribe({
      next: () => this.router.navigate(['/assessors', 'list']),
      error: err => {
        console.error(err);
        this.error = 'Error al registrar el asesor';
      }
    });
  }
}
