// src/app/banking/banking-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BankingService } from '../banking.service';
import { Banking } from '../banking';

@Component({
  selector: 'app-banking-edit',
  templateUrl: './banking-edit.component.html',
  styleUrls: ['./banking-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class BankingEditComponent implements OnInit {
  bankingForm!: FormGroup;
  bankingId!: number;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bankingService: BankingService
  ) {}

  ngOnInit(): void {
    this.bankingId = Number(this.route.snapshot.paramMap.get('id'));

    // 1) crear el form
    this.bankingForm = this.fb.group({
      name: ['', Validators.required],
      uriLogo: ['', Validators.required],
      assessorPhone: ['', Validators.required]
    });

    this.loading = true;
    // 2) cargar datos existentes
    this.bankingService.getBankings().subscribe({
      next: (list) => {
        const b = list.find(x => x.id === this.bankingId);
        if (!b) {
          this.error = 'Respaldo bancario no encontrado';
          this.loading = false;
          return;
        }
        this.bankingForm.patchValue({
          name: b.name,
          uriLogo: b.uriLogo,
          assessorPhone: b.assessorPhone
        });
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'No se pudieron cargar los datos';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.bankingForm.invalid) return;
    const { name, uriLogo, assessorPhone } = this.bankingForm.value;
    const updated: Banking = {
      id: this.bankingId,
      name,
      uriLogo,
      assessorPhone
    };
    this.bankingService.updateBanking(this.bankingId, updated).subscribe({
      next: () => this.router.navigate(['/bankings/list']),
      error: err => {
        console.error(err);
        this.error = 'Error al guardar los cambios';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/bankings/list']);
  }
}
