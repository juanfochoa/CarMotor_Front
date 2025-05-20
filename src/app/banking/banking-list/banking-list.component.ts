import { Component, OnInit } from '@angular/core';
import { BankingService } from '../banking.service';
import { Banking } from '../banking';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banking-list',
  templateUrl: './banking-list.component.html',
  styleUrls: ['./banking-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BankingListComponent implements OnInit {
  bankings: Banking[] = [];

  constructor(private bankingService: BankingService) {}

  ngOnInit(): void {
    this.bankingService.getBankings().subscribe(b => this.bankings = b);
  }
}
