import { inject, Injectable } from '@angular/core';
import { CivilStatus } from '../../../core/enum/civil-status.enum';
import { HttpClient } from '@angular/common/http';
import { QuoteRequest } from '../model/quote-request.model';
import { Observable } from 'rxjs';

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

  endpoint =   'http://localhost:8080/api/v1/quotes/familyshield';


  quoteFamilyShield(
    request: QuoteRequest & { policyHolderCivilStatus: CivilStatus },
  ): Observable<QuoteApiResponse> {
    // return this.http.post<QuoteApiResponse>('/api/v1/quotes/familyshield', request);
    return this.http.post<QuoteApiResponse>(this.endpoint, request);
  }
}
