import { Component, OnInit } from '@angular/core';
import { AssessorService } from '../assessor.service';
import { Assessor } from '../assessor';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assessor-list',
  templateUrl: './assessor-list.component.html',
  styleUrls: ['./assessor-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AssessorListComponent implements OnInit {
  assessors: Assessor[] = [];

  constructor(private assessorService: AssessorService) {}

  ngOnInit(): void {
    this.assessorService.getAssessors().subscribe(a => this.assessors = a);
  }
}
