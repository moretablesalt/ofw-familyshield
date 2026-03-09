import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barangay } from '../model/barangay';

@Injectable({
  providedIn: 'root'
})
export class BarangayApi {
  private apiUrl = 'https://appservice-address-f7h9a9f8b4c2f5a8.southeastasia-01.azurewebsites.net/api'; // Change this to your actual backend URL

  constructor(private http: HttpClient) {}

  getBarangays(municipalityCode: string): Observable<Barangay[]> {
    const params = new HttpParams().set('municipalityCode', municipalityCode);
    return this.http.get<Barangay[]>(`${this.apiUrl}/barangays`, { params });
  }
}
