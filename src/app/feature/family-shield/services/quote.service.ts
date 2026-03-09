import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuoteRequest } from '../model/quote-request.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export type QuoteApiResponse = {
  familyShieldCoverage: {
    ofw: string;
    spouse: string;
    parent: string;
    child: string;
    sibling: string;
  };
  familyShieldPremium: {
    family: string;
    ofw: string;
    total: string;
    basicPremium: string;
  };
  taxes: {
    docStamp: string;
    lgt: string;
    premiumTax: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private http = inject(HttpClient);

  // endpoint = 'http://localhost:8081/api/v1/quotes/familyshield';
  endpoint = environment.HOST_URL + '/api/v1/quotes/familyshield';

  quoteFamilyShield(request: QuoteRequest): Observable<QuoteApiResponse> {
    // return this.http.post<QuoteApiResponse>('/api/v1/quotes/familyshield', request);
    return this.http.post<QuoteApiResponse>(this.endpoint, request);
  }
}
