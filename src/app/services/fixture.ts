import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Fixture } from '../models/fixture';

interface ApiMatch {
  id: number;
  utcDate: string;
  status: string;
  venue: string;

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
          .map((match): Fixture => ({
            id: match.id,
            date: match.utcDate,
            venue: match.venue,
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name,
            homeScore: match.score.fullTime.home,
            awayScore: match.score.fullTime.away,
            competition: match.competition.name,
            status:
              match.status === 'FINISHED'
                ? 'FINISHED'
                : 'UPCOMING',
          }))
          .sort(
            (a, b) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          ), 
      ),
    );
  }
}