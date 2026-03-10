import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barangay } from '../model/barangay';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BarangayApi {
  private apiUrl = environment.ADDRESS_API_URL + '/api/barangays'; // Change this to your actual backend URL

  constructor(private http: HttpClient) {}

  getBarangays(municipalityCode: string): Observable<Barangay[]> {
    const params = new HttpParams().set('municipalityCode', municipalityCode);
    return this.http.get<Barangay[]>(this.apiUrl, { params });
  }
}
