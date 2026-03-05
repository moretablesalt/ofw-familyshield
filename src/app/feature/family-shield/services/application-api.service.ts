import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationRequestDto } from '../model/dto/application-request.dto';
import { Observable } from 'rxjs';
import { ApplicationResponseDto } from '../model/dto/application-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService {
  private http = inject(HttpClient);

  create(request: ApplicationRequestDto): Observable<ApplicationResponseDto> {
    return this.http.post<ApplicationResponseDto>('/api/applications', request);
  }
}
