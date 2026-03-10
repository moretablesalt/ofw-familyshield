import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationRequestDto } from '../model/dto/application-request.dto';
import { Observable } from 'rxjs';
import { ApplicationResponseDto } from '../model/dto/application-response.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService {
  private http = inject(HttpClient);

  endpoint = environment.HOST_URL + '/api/applications';

  create(request: ApplicationRequestDto): Observable<ApplicationResponseDto> {
    return this.http.post<ApplicationResponseDto>(this.endpoint, request);
  }
}
