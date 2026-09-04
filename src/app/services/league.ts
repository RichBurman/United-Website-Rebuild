import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { LeagueApiResponse } from '../models/league-api';
import { LeagueTeam } from '../models/league';

@Injectable({
  providedIn: 'root',
})
export class League {
  private http = inject(HttpClient);

  getLeagueTable(): Observable<LeagueTeam[]> {
    const headers = new HttpHeaders({
      'X-Auth-Token': environment.apiToken,
    });

    return this.http
      .get<LeagueApiResponse>('/api/v4/competitions/PL/standings', { headers })
      .pipe(
        map((response) =>
          response.standings[0].table.map((team) => ({
            position: team.position,
            teamName: team.team.shortName,
            playedGames: team.playedGames,
            won: team.won,
            draw: team.draw,
            lost: team.lost,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
            points: team.points,
          })),
        ),
      );
  }
}
