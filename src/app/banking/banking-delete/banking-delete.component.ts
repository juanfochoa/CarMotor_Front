// src/app/banking/banking-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BankingService } from '../banking.service';
import { Banking } from '../banking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banking-delete',
  templateUrl: './banking-delete.component.html',
  styleUrls: ['./banking-delete.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BankingDeleteComponent implements OnInit {
  bankings: Banking[] = [];
  error: string | null = null;

  constructor(
    private bankingService: BankingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBankings();
  }

  private loadBankings() {
    this.bankingService.getBankings().subscribe({
      next: list => this.bankings = list,
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de respaldos bancarios';
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/bankings', id, 'edit']);
  }

  delete(id: number): void {
    if (!confirm('¿Eliminar este respaldo bancario?')) return;
    this.bankingService.deleteBanking(id).subscribe({
      next: () => {
        this.bankings = this.bankings.filter(b => b.id !== id);
      },
      error: err => {
        console.error(err);
        this.error = 'Error al eliminar el respaldo bancario';
      }
    });
  }
}
