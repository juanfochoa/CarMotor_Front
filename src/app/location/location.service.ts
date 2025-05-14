import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location';
import { LocationDetail } from './locationDetail';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = environment.apiUrl + '/locations';

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  getLocation(id: number): Observable<LocationDetail> {
    return this.http.get<LocationDetail>(`${this.apiUrl}/${id}`);
  }

}
