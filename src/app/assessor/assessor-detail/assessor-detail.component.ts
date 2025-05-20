import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessorService } from '../assessor.service';
import { AssessorDetail } from '../assessorDetail'; // cambio aquí
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assessor-detail',
  templateUrl: './assessor-detail.component.html',
  styleUrls: ['./assessor-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AssessorDetailComponent implements OnInit {
  assessor!: AssessorDetail;

  constructor(private route: ActivatedRoute, private assessorService: AssessorService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.assessorService.getAssessor(+id).subscribe(a => this.assessor = a);
    }
  }
}
