import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Fixture } from '../models/fixture';

interface ApiMatch {
  id: number;
  utcDate: string;
  status: string;
  homeTeam: {
    id: number;
    name: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  competition: {
    name: string;
  };
}

interface MatchesResponse {
  matches: ApiMatch[];
}

@Injectable({
  providedIn: 'root',
})
export class FixtureService {
  private http = inject(HttpClient);

  getFixtures(): Observable<Fixture[]> {
    return this.http.get<MatchesResponse>('/data/matches.json').pipe(
      map((response) =>
        response.matches
          .filter((match) => match.status === 'TIMED')
          .map((match) => ({
            id: match.id,
            date: match.utcDate,
            opponent:
              match.homeTeam.id === 66
                ? match.awayTeam.name
                : match.homeTeam.name,
            venue:
              match.homeTeam.id === 66 ? 'Old Trafford' : match.homeTeam.name,
            homeMatch: match.homeTeam.id === 66,
            opponentCrest:
              match.homeTeam.id === 66
                ? match.awayTeam.crest
                : match.homeTeam.crest,
          })),
      ),
    );
  }
}
