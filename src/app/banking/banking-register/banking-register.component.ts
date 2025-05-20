// src/app/banking/banking-register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BankingService } from '../banking.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banking-register',
  templateUrl: './banking-register.component.html',
  styleUrls: ['./banking-register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
})
export class BankingRegisterComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bankingService: BankingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      uriLogo: ['', Validators.required],
      assessorPhone: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { name, uriLogo, assessorPhone } = this.form.value;
    const payload = { name, uriLogo, assessorPhone };
    this.bankingService.addBanking(payload as any).subscribe({
      next: () => this.router.navigate(['/bankings/list']),
      error: err => {
        console.error(err);
        this.error = 'Error al registrar el respaldo bancario';
      }
    });
  }
}
