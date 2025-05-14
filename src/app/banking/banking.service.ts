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
}
