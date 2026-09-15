import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Fixture } from '../../models/fixture';
import { FixtureService } from '../../services/fixture/fixture';

import { LeagueTeam } from '../../models/league';
import { League } from '../../services/league/league';

@Component({
  selector: 'app-home',
  imports: [DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private fixtureService = inject(FixtureService);
  private leagueService = inject(League);

  fixtures = signal<Fixture[]>([]);
  leagueTable = signal<LeagueTeam[]>([]);

  miniLeagueTable = computed(() => {
    const table = this.leagueTable();

    const unitedIndex = table.findIndex((team) => team.tla === 'MUN');

    if (unitedIndex === -1) {
      return [];
    }

    const startIndex = Math.max(0, unitedIndex - 2);
    const endIndex = Math.min(table.length, unitedIndex + 3);

    return table.slice(startIndex, endIndex);
  });

  lastResult = computed(() => {
    const finishedMatches = this.fixtures().filter(
      (fixture) => fixture.status === 'FINISHED',
    );

    return finishedMatches.at(-1);
  });

  nextMatch = computed(() => {
    return this.fixtures().find((fixture) => fixture.status === 'UPCOMING');
  });

  recentForm = computed(() => {
    const finishedMatches = this.fixtures()
      .filter((fixture) => fixture.status === 'FINISHED')
      .slice(-5);

    return finishedMatches.map((fixture) => {
      if (fixture.homeScore === fixture.awayScore) {
        return 'D';
      }

      const unitedAreHome = fixture.homeTeam === 'Man United';

      if (unitedAreHome) {
        return fixture.homeScore! > fixture.awayScore! ? 'W' : 'L';
      }

      return fixture.awayScore! > fixture.homeScore! ? 'W' : 'L';
    });
  });

  constructor() {
    this.loadFixtures();
    this.loadLeagueTable();
  }

  loadFixtures() {
    this.fixtureService.getFixtures().subscribe({
      next: (fixtures) => {
        this.fixtures.set(fixtures);
      },
      error: (error) => {
        console.error('Unable to load home fixtures:', error);
      },
    });
  }

  loadLeagueTable() {
    this.leagueService.getLeagueTable().subscribe({
      next: (table) => {
        this.leagueTable.set(table);
      },
      error: (error) => {
        console.error('Unable to load league table:', error);
      },
    });
  }
}
