import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssessorService } from '../assessor.service';
import { AssessorDetail } from '../assessorDetail';

@Component({
  selector: 'app-assessor-edit',
  templateUrl: './assessor-edit.component.html',
  styleUrls: ['./assessor-edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AssessorEditComponent implements OnInit {
  assessorForm!: FormGroup;
  assessorId!: number;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private assessorService: AssessorService
  ) {}

  ngOnInit(): void {
    this.assessorId = Number(this.route.snapshot.paramMap.get('id'));
    this.assessorForm = this.fb.group({
      name: ['', Validators.required],
      uriPhoto: ['', Validators.required],
      contactInfo: ['', Validators.required],
      locationId: [null, Validators.required]
    });

    this.loading = true;
    this.assessorService.getAssessor(this.assessorId).subscribe({
      next: (a: AssessorDetail) => {
        this.assessorForm.patchValue({
          name: a.name,
          uriPhoto: a.uriPhoto,
          contactInfo: a.contactInfo,
          locationId: a.location.id
        });
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar los datos del asesor';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.assessorForm.invalid) return;
    const { name, uriPhoto, contactInfo, locationId } = this.assessorForm.value;
    const updated = new AssessorDetail(
      this.assessorId,
      name,
      uriPhoto,
      contactInfo,
      // construye aquí el Location mínimo; el backend solo usará el id
      { id: locationId, name: '', address: '', phoneNumber: '', schedule: '' }
    );
    this.assessorService.updateAssessor(this.assessorId, updated).subscribe({
      next: () => this.router.navigate(['/assessors/list']),
      error: err => {
        console.error(err);
        this.error = 'Error al guardar los cambios';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/assessors/list']);
  }
}
