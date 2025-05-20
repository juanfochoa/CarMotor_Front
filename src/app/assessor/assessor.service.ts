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

  addAssessor(assessor: Assessor): Observable<Assessor> {
    return this.http.post<Assessor>(this.apiUrl, assessor);
  }

  updateAssessor(id: number, assessor: Assessor): Observable<Assessor> {
    return this.http.put<Assessor>(`${this.apiUrl}/${id}`, assessor);
  }

  deleteAssessor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
