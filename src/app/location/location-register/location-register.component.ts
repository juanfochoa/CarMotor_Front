// src/app/location/location-register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../location.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-register',
  templateUrl: './location-register.component.html',
  styleUrls: ['./location-register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
})
export class LocationRegisterComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      schedule: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { name, address, phoneNumber, schedule } = this.form.value;
    const payload = { name, address, phoneNumber, schedule };
    this.locationService.addLocation(payload as any).subscribe({
      next: () => this.router.navigate(['/locations/list']),
      error: err => {
        console.error(err);
        this.error = 'Error al registrar la sede';
      }
    });
  }
}
