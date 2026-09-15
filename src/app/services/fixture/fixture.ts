import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Fixture } from '../../models/fixture';
import { FixtureApiResponse } from '../../models/fixture-api';

@Injectable({
  providedIn: 'root',
})
export class FixtureService {
  private http = inject(HttpClient);

  getFixtures(): Observable<Fixture[]> {
    const headers = new HttpHeaders({
      'X-Auth-Token': environment.apiToken,
    });

    return this.http
      .get<FixtureApiResponse>('/api/v4/teams/66/matches', { headers })
      .pipe(
        map((response) => {
          console.log('RAW UNITED MATCHES:', response.matches);

          return response.matches
            .map(
              (match): Fixture => ({
                id: match.id,
                date: match.utcDate,
                venue:
                  match.venue ??
                  (match.homeTeam.tla === 'MUN' ? 'Old Trafford' : 'Away'),
                homeTeam: match.homeTeam.shortName,
                homeTeamCrest: match.homeTeam.crest,
                awayTeam: match.awayTeam.shortName,
                awayTeamCrest: match.awayTeam.crest,
                homeScore: match.score.fullTime.home,
                awayScore: match.score.fullTime.away,
                competition: match.competition.name,
                status: match.status === 'FINISHED' ? 'FINISHED' : 'UPCOMING',
              }),
            )
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            );
        }),
      );
  }
}
