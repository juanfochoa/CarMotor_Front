import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Assessor } from './assessor';
import { AssessorDetail } from './assessorDetail';

@Injectable({
  providedIn: 'root'
})
export class AssessorService {
  private apiUrl = environment.apiUrl + '/assessors';

  constructor(private http: HttpClient) {}

  getAssessors(): Observable<Assessor[]> {
    return this.http.get<Assessor[]>(this.apiUrl);
  }

  getAssessor(id: number): Observable<AssessorDetail> {
    return this.http.get<AssessorDetail>(`${this.apiUrl}/${id}`);
  }
}
