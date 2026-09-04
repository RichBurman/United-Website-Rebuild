import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { LeagueApiResponse } from '../models/league-api';

@Injectable({
  providedIn: 'root',
})
export class League {
  private http = inject(HttpClient);

  getLeagueTable(): Observable<LeagueApiResponse> {
    const headers = new HttpHeaders({
      'X-Auth-Token': environment.apiToken,
    });

    return this.http.get<LeagueApiResponse>(
      '/v4/competitions/PL/standings',
      { headers },
    );
  }
}
