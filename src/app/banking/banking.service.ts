import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banking } from './banking';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private apiUrl = environment.apiUrl + '/bankings';

  constructor(private http: HttpClient) {}

  getBankings(): Observable<Banking[]> {
    return this.http.get<Banking[]>(this.apiUrl);
  }

  addBanking(banking: Banking): Observable<Banking> {
    return this.http.post<Banking>(this.apiUrl, banking);
  }

  updateBanking(id: number, banking: Banking): Observable<Banking> {
    return this.http.put<Banking>(`${this.apiUrl}/${id}`, banking);
  }

  deleteBanking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}